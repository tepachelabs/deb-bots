import express, {Request, Response, Router} from 'express';

const router: Router = express.Router();

router.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello, World!' });
});

// Add more routes as needed

export default router;
