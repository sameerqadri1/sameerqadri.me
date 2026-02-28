// Local development entry point — runs the Express server with app.listen().
// Vercel uses src/vercel.ts instead.
import { app } from './app.js';

const PORT = process.env.API_PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
