import express from "express";
import cors from "cors";
import routes from "./routes";

export function launch(port) {
  const application = express();

  console.log("Port: " + port);
  application.use(cors());
  application.use("/", routes);

  application.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  });
}
