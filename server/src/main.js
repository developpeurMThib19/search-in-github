import { launch } from "./server";

const { PORT = 8000 } = process.env;
launch(PORT);
