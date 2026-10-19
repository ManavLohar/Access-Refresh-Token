import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => {
  console.log("Server running on port 3000!");
});
