import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import sessionRoutes from "./routes/sessionRoutes.js"
import questionRoutes from "./routes/questionRoutes.js"
import protect from "./middlewares/protect.js"
import { generateInterviewQuestions, generateConceptExplanation } from "./controllers/aiController.js"



dotenv.config(); // Load env variables



const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json())


//Serve upload folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}))

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use(
  "/api/ai/generate-questions",
  protect,
  generateInterviewQuestions
);
app.use(
  "/api/ai/generate-explanation",
  protect,
  generateConceptExplanation
);

app.listen(3000, () => {
  connectDB();
  // console.log(Object.keys(User.schema.paths));

  console.log("Server is running on port 3000", 3000);
});



// This is an Error Handling Middleware
app.use((err, req, res, next) => {
  // Check if the error is specifically a JSON syntax error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      success: false,
      message: "The JSON data you sent is malformed. Please check for trailing commas or missing quotes." 
    });
  }
  
  // Handle other unexpected errors
  res.status(500).json({ success: false, message: "Internal Server Error" });
});