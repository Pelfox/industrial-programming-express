import type { Request, Response } from 'express';
import type { ImageService } from '../services/imageService';
import type { CreateImageInput } from '../types';

export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const { url, name }: { url?: unknown; name?: unknown } = req.body ?? {};

    if (typeof url !== 'string' || url.trim() === '') {
      console.warn('[ImageController] Create validation failed: missing URL');
      return res.status(400).json({ error: 'URL is required and must be a non-empty string.' });
    }

    const input: CreateImageInput = { url, name: typeof name === 'string' ? name : null };
    console.info('[ImageController] Creating new image', { url: input.url, name: input.name });
    const record = await this.imageService.createImage(input);
    return res.status(201).json(record);
  };

  list = async (_: Request, res: Response): Promise<Response> => {
    console.info('[ImageController] Listing all images');
    const records = await this.imageService.listImages();
    return res.json(records);
  };

  getById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    const { id } = req.params;
    console.info('[ImageController] Fetching an image', { id });
    const record = await this.imageService.getImage(id);

    if (!record) {
      console.warn('[ImageController] Image not found', { id });
      return res.status(404).json({ error: 'Image not found.' });
    }

    return res.json(record);
  };

  delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    const { id } = req.params;
    console.info('[ImageController] Deleting an image', { id });
    const deleted = await this.imageService.deleteImage(id);

    if (!deleted) {
      console.warn('[ImageController] Image not found (DELETE)', { id });
      return res.status(404).json({ error: 'Image not found.' });
    }

    return res.status(204).send();
  };
}
