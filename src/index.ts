import express from 'express';
import { ImageController } from './controllers/imageController';
import { ImageService } from './services/imageService';
import { InMemoryImageStorage } from './storage';

const app = express();
app.use(express.json());

const storage = new InMemoryImageStorage();
const imageService = new ImageService(storage);
const imageController = new ImageController(imageService);

app.post('/images', imageController.create);
app.get('/images', imageController.list);
app.get('/images/:id', imageController.getById);
app.delete('/images/:id', imageController.delete);

const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
