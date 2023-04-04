import { Redis } from "ioredis";

export default new Redis(process.env.REDIS_HOST as string);
