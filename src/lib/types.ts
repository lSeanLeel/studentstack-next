export interface Mentor {
  id: number;
  name: string;
  university: string;
  classYear: string;
  major: string;
  bio: string;
  accomplishments: string[];
  initials: string;
  photo?: string;
  status: 'online' | 'offline';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  major: string;
  grade: string;
  onboardingComplete: boolean;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderType: 'student' | 'mentor' | 'system';
  timestamp: number;
}

export interface ChatSession {
  id: string;
  studentId: string;
  studentName: string;
  messages: Message[];
  activeMentors: number[]; // IDs of mentors currently in the chat
}
