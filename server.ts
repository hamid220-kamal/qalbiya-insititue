import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Route to receive a reflection message and attempt to forward to WhatsApp +91 81453 63290
app.post("/api/send-message", async (req, res) => {
  const { message, authorName, contactInfo, sourceRoute } = req.body;

  if (!message || !message.trim()) {
    res.status(400).json({ error: "Message content is required" });
    return;
  }

  const cleanMessage = message.trim();
  const timestamp = new Date().toISOString();
  
  // Prepare metadata for saving and sending
  const messageData = {
    message: cleanMessage,
    authorName: authorName || "Anonymous Seeker",
    contactInfo: contactInfo || "Not Provided",
    sourceRoute: sourceRoute || "general",
    timestamp
  };

  // 1. Always persist the message locally on the server in a JSON file so it is never lost
  const messagesFilePath = path.join(process.cwd(), "messages.json");
  let messagesList = [];
  try {
    if (fs.existsSync(messagesFilePath)) {
      const fileData = fs.readFileSync(messagesFilePath, "utf8");
      messagesList = JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading local messages file:", err);
  }

  messagesList.push(messageData);

  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messagesList, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to local messages file:", err);
  }

  // 2. Prepare forwarding result statuses
  let whatsappSent = false;
  let whatsappMethod = "none";
  let whatsappError = null;

  // Recipient Number (Sister Mustara's or requested number)
  const targetNumber = "+918145363290";

  // Check if Twilio credentials are configured
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_FROM_WHATSAPP; // e.g., whatsapp:+14155238886

  // Check if CallMeBot credentials are configured (alternative free way)
  const callmebotApiKey = process.env.CALLMEBOT_API_KEY;

  if (twilioSid && twilioToken && twilioFrom) {
    // A. Attempt sending via Twilio WhatsApp API
    try {
      const client = twilio(twilioSid, twilioToken);
      const formattedFrom = twilioFrom.startsWith("whatsapp:") ? twilioFrom : `whatsapp:${twilioFrom}`;
      const formattedTo = `whatsapp:${targetNumber}`;
      
      const textBody = `✨ Qalbiya Reflection received!\n\nMessage: "${cleanMessage}"\n\nFrom: ${messageData.authorName}\nContact: ${messageData.contactInfo}\nTimestamp: ${timestamp}`;

      await client.messages.create({
        from: formattedFrom,
        body: textBody,
        to: formattedTo
      });

      whatsappSent = true;
      whatsappMethod = "twilio";
    } catch (err: any) {
      console.error("Twilio WhatsApp sending failed:", err);
      whatsappError = err.message || err;
    }
  } else if (callmebotApiKey) {
    // B. Attempt sending via CallMeBot API (free WhatsApp gateway)
    try {
      const textBody = encodeURIComponent(
        `✨ Qalbiya Reflection received!\n\nMessage: "${cleanMessage}"\n\nFrom: ${messageData.authorName}\nContact: ${messageData.contactInfo}`
      );
      const url = `https://api.callmebot.com/whatsapp.php?phone=${targetNumber}&text=${textBody}&apikey=${callmebotApiKey}`;
      
      const response = await fetch(url);
      if (response.ok) {
        whatsappSent = true;
        whatsappMethod = "callmebot";
      } else {
        const text = await response.text();
        whatsappError = `CallMeBot error: ${text}`;
      }
    } catch (err: any) {
      console.error("CallMeBot sending failed:", err);
      whatsappError = err.message || err;
    }
  }

  // 3. Return a success response detailing what happened
  if (whatsappSent) {
    res.json({
      success: true,
      persisted: true,
      whatsappSent: true,
      method: whatsappMethod,
      message: "Your message has been sent directly to Sister Mustara's WhatsApp and stored securely!"
    });
  } else {
    // No credentials configured, or delivery failed
    const reason = whatsappError 
      ? `WhatsApp delivery failed: ${whatsappError}` 
      : "WhatsApp API keys are not configured yet. The message is securely stored on the server.";
      
    res.json({
      success: true,
      persisted: true,
      whatsappSent: false,
      reason,
      message: "✓ Your note has been saved. Sister Mustara will be notified!"
    });
  }
});

// Endpoint to handle formal Contact Page inquiries, persisting them to inquiries.json
app.post("/api/contact", async (req, res) => {
  const { name, email, whatsapp, subject, message } = req.body;

  if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
    res.status(400).json({ error: "Name, email, and message are required fields." });
    return;
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanWhatsapp = whatsapp ? whatsapp.trim() : "Not Provided";
  const cleanSubject = subject ? subject.trim() : "General Inquiry";
  const cleanMessage = message.trim();
  const timestamp = new Date().toISOString();

  const inquiryData = {
    name: cleanName,
    email: cleanEmail,
    whatsapp: cleanWhatsapp,
    subject: cleanSubject,
    message: cleanMessage,
    timestamp
  };

  // 1. Persist the inquiry to inquiries.json
  const inquiriesFilePath = path.join(process.cwd(), "inquiries.json");
  let inquiriesList = [];
  try {
    if (fs.existsSync(inquiriesFilePath)) {
      const fileData = fs.readFileSync(inquiriesFilePath, "utf8");
      inquiriesList = JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading local inquiries file:", err);
  }

  inquiriesList.push(inquiryData);

  try {
    fs.writeFileSync(inquiriesFilePath, JSON.stringify(inquiriesList, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to local inquiries file:", err);
  }

  // 2. Prepare forwarding result status
  let whatsappSent = false;
  let whatsappMethod = "none";
  let whatsappError = null;
  const targetNumber = "+918145363290";

  // Check if Twilio credentials are configured
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_FROM_WHATSAPP;

  // Check if CallMeBot credentials are configured
  const callmebotApiKey = process.env.CALLMEBOT_API_KEY;

  const notificationText = `📧 New Qalbiya Inquiry!\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nWhatsApp: ${cleanWhatsapp}\nSubject: ${cleanSubject}\n\nMessage:\n"${cleanMessage}"`;

  if (twilioSid && twilioToken && twilioFrom) {
    try {
      const client = twilio(twilioSid, twilioToken);
      const formattedFrom = twilioFrom.startsWith("whatsapp:") ? twilioFrom : `whatsapp:${twilioFrom}`;
      const formattedTo = `whatsapp:${targetNumber}`;

      await client.messages.create({
        from: formattedFrom,
        body: notificationText,
        to: formattedTo
      });

      whatsappSent = true;
      whatsappMethod = "twilio";
    } catch (err: any) {
      console.error("Twilio forwarding for contact failed:", err);
      whatsappError = err.message || err;
    }
  } else if (callmebotApiKey) {
    try {
      const textBody = encodeURIComponent(notificationText);
      const url = `https://api.callmebot.com/whatsapp.php?phone=${targetNumber}&text=${textBody}&apikey=${callmebotApiKey}`;
      
      const response = await fetch(url);
      if (response.ok) {
        whatsappSent = true;
        whatsappMethod = "callmebot";
      } else {
        const text = await response.text();
        whatsappError = `CallMeBot error: ${text}`;
      }
    } catch (err: any) {
      console.error("CallMeBot forwarding for contact failed:", err);
      whatsappError = err.message || err;
    }
  }

  res.json({
    success: true,
    persisted: true,
    whatsappSent,
    message: "✓ Your inquiry has been submitted successfully! We will get back to you shortly."
  });
});

// Endpoint to fetch list of messages (useful for the developer/administrator to debug or view)
app.get("/api/messages", (req, res) => {
  const messagesFilePath = path.join(process.cwd(), "messages.json");
  try {
    if (fs.existsSync(messagesFilePath)) {
      const fileData = fs.readFileSync(messagesFilePath, "utf8");
      res.json(JSON.parse(fileData));
    } else {
      res.json([]);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to read messages log" });
  }
});

// Vite middleware configuration for serving the client-side SPA
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
