import { config } from "dotenv";
config();

export const auth: string = process.env.KEY as string;
