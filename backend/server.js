import app from "./app.js";
import 'dotenv/config';
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

app.set('port', PORT);

const server = app.listen(PORT, () => {
    console.log(`Express running → On PORT : ${server.address().port}`);
});

