import { Session } from "next-auth";

export interface CustomSession extends Session {
  user?: {
    id?: number;
    name?: string | null;
    email?: string | null;
    access_token?: string | null;
  };
}
