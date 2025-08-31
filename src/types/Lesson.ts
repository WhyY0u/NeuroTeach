// DTO с бекенда
export interface LessonDTO {
  id: string;
  predmet: string;
  durationM: number;
  tema: string;
  AOld: string;
  style: string;
  createdAt: string;
  updatedAt: string;
  structure?: {
    introduction: string;
    introductionUrl?: string;
    explanation: string;
    explanationUrl?: string;
    practice: string;
    practiceUrl?: string;
    conclusion: string;
    conclusionUrl?: string;
    imageUrl?: string;
    audioUrl?: string;
  } | null;
}

// Тип для фронтенда
export interface Lesson {
  id: string;
  title: string;
  subject: Subject;
  topic: string;
  level: string;
  duration: number;
  style: LessonStyle;
  createdAt: Date;
  updatedAt: Date;
  plan?: LessonPlan;
  videoScript?: string;
  imageUrl?: string;
  audioUrl?: string;
}

// План урока
export interface LessonPlan {
  introduction: string;
  introductionUrl?: string;
  explanation: string;
  explanationUrl?: string;
  practice: string;
  practiceUrl?: string;
  conclusion: string;
  conclusionUrl?: string;
}

export function mapLessonDTOToLesson(dto: LessonDTO): Lesson {
  return {
    id: dto.id,
    title: dto.tema,
    subject: dto.predmet as Subject,
    topic: dto.tema,
    level: dto.AOld,
    duration: dto.durationM,
    style: dto.style as LessonStyle,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    plan: dto.structure
      ? {
          introduction: dto.structure.introduction,
          introductionUrl: dto.structure.introductionUrl,
          explanation: dto.structure.explanation,
          explanationUrl: dto.structure.explanationUrl,
          practice: dto.structure.practice,
          practiceUrl: dto.structure.practiceUrl,
          conclusion: dto.structure.conclusion,
          conclusionUrl: dto.structure.conclusionUrl,
        }
      : undefined,
    imageUrl: dto.structure?.imageUrl,
    audioUrl: dto.structure?.audioUrl,
  };
}


export type LessonStyle = 'strict' | 'easy' | 'examples' | 'creative';
export type Subject =
  | 'mathematics'
  | 'history'
  | 'biology'
  | 'physics'
  | 'chemistry'
  | 'literature'
  | 'geography'
  | 'other';
