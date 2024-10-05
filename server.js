import app from "./app.js";
import { dbConnection } from "./dbConnection.js";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await dbConnection();
  console.log(`server running on Port ${port}`);
});
