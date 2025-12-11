import type { ImageStorage } from '../storage';
import type { CreateImageInput, ImageRecord } from '../types';
import { randomUUID } from 'node:crypto';

export class ImageService {
  constructor(private readonly storage: ImageStorage) {}

  async createImage(input: CreateImageInput): Promise<ImageRecord> {
    const record: ImageRecord = {
      id: randomUUID(),
      url: input.url.trim(),
      name: input.name && input.name.trim() !== '' ? input.name.trim() : null,
      createdAt: new Date().toISOString(),
    };

    console.debug('[ImageService] Storing an image', { id: record.id, url: record.url });
    return this.storage.create(record);
  }

  async listImages(): Promise<ImageRecord[]> {
    console.debug('[ImageService] Listing all images');
    return this.storage.list();
  }

  async getImage(id: string): Promise<ImageRecord | null> {
    console.debug('[ImageService] Fetching image', { id });
    return this.storage.getById(id);
  }

  async deleteImage(id: string): Promise<boolean> {
    console.debug('[ImageService] Deleting image', { id });
    return this.storage.deleteById(id);
  }
}
