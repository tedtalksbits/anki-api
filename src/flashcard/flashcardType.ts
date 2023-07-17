export type FlashcardType = {
  id: number;
  deck_id: number;
  user_id: number;
  question: string;
  answer: string;
  tags: string;
  type: string;
  hint: string;
  mastery_level: number;
  image: string;
  audio: string;
  video: string;
  readonly created_at: Date;
  readonly updated_at: Date;
};

export type FlashcardDTOType = {
  id?: number;
  deck_id?: number;
  user_id?: number;
  question?: string;
  answer?: string;
  tags?: string;
  type?: string;
  hint?: string;
  mastery_level?: number;
  image?: string;
  audio?: string;
  video?: string;
};
