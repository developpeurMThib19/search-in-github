import * as dotenv from "dotenv";
dotenv.config();

export default ({ config }) => {
  return { ...config };
};