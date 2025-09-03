export type Called = {
  id: string;
  title: string;
  description: string;
  openDate: string;
  endDate: string | null;
  timeStartedAt: string | null;
  timeSpent: number;
  situationId: number;
  userRequest: { name: string };
  category: { name: string };
  situation: { name: string };
};

export type Commentary = {
  id: string;
  description: string;
  creationDate: string;
};

export type Situation = {
  id: number;
  name: string;
};