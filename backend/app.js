import express from "express"; 
import faqsRouter from "./routes/faqs.routes.js";

// create our Express app
const app = express();

app.use(express.json());

// Here our API Routes
app.use('/api/faqs', faqsRouter);

// done! we export it so we can start the site in start.js
export default app;