export interface ImageRecord {
  id: string;
  url: string;
  name: string | null;
  createdAt: string;
}

export interface CreateImageInput {
  url: string;
  name?: string | null;
}
