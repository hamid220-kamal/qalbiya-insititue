export interface FAQItem {
  q: string;
  a: string;
}

export interface Course {
  slug: string;
  category: 'women' | 'kids';
  title: string;
  badge: string;
  hook: string;
  sub: string;
  duration: string;
  price: string;
  priceDetail: string;
  syllabus: string[];
  whatYouGet: string[];
  outcome: string;
  courseDetails: Record<string, string>;
  teacherNote: string;
  whoThisIsFor: string[];
  faqs: FAQItem[];
  image: string;
  howLearn?: string; // Optional field for kids' programs
  age?: string; // Optional field for kids' programs
}

export interface ScholarshipApplication {
  fullName: string;
  age: string;
  whatsapp: string;
  email?: string;
  course: string;
  reason: string;
  partialPayment: string;
  previousCourse: string;
  additionalInfo?: string;
}

export type Route = 'home' | 'about' | 'women' | 'kids' | 'freeCourses' | 'scholarship' | 'courseDetail' | 'contact' | 'refundPolicy' | 'termsAndConditions' | 'privacyPolicy' | 'faq' | 'sacredKnowledge' | 'asmaUlHusna' | 'fivePillars';
