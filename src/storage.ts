import type { ImageRecord } from './types';

export interface ImageStorage {
  create: (record: ImageRecord) => Promise<ImageRecord>;
  list: () => Promise<ImageRecord[]>;
  getById: (id: string) => Promise<ImageRecord | null>;
  deleteById: (id: string) => Promise<boolean>;
}

export class InMemoryImageStorage implements ImageStorage {
  private records: ImageRecord[] = [];

  async create(record: ImageRecord): Promise<ImageRecord> {
    this.records.push(record);
    return record;
  }

  async list(): Promise<ImageRecord[]> {
    return this.records;
  }

  async getById(id: string): Promise<ImageRecord | null> {
    const match = this.records.find((record) => record.id === id);
    return match ?? null;
  }

  async deleteById(id: string): Promise<boolean> {
    const idx = this.records.findIndex((record) => record.id === id);
    if (idx === -1) {
      return false;
    }

    this.records.splice(idx, 1);
    return true;
  }
}
