import { AES, enc } from "crypto-ts";
import { config } from "dotenv";

config();

const key: string = process.env.ENCRYPTION_KEY as string;

export default class Encryption {
  public static encrypt(data: string): string {
    return AES.encrypt(data, key).toString();
  }

  public static decrypt(data: string): string {
    return AES.decrypt(data, key).toString(enc.Utf8);
  }

  public static validateChar(data: string) {
    return /[^a-zA-Z0-9.,\-\s@]/g.test(data) ? true : false;
  }
}
