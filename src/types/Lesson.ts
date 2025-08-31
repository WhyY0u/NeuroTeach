export interface Lesson {
  id: string;
  title: string;
  subject: string;
  topic: string;
  level: string;
  duration: number;
  style: string;
  createdAt: Date;
  plan?: LessonPlan;
  videoScript?: string;
}

export interface LessonPlan {
  introduction: string;
  explanation: string;
  practice: string;
  conclusion: string;
}

export type LessonStyle = 'strict' | 'easy' | 'examples' | 'creative';
export type Subject = 'mathematics' | 'history' | 'biology' | 'physics' | 'chemistry' | 'literature' | 'geography' | 'other';