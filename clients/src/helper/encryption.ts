import { AES, enc } from "crypto-ts";

const ENCRYPTION_KEY: string = process.env.ENCRYPTION_KEY as string;

export default class Encryption {
  public static encrypt(data: string, key?: string): string {
    if (!key) key = ENCRYPTION_KEY;
    return AES.encrypt(data, key).toString();
  }

  public static decrypt(data: string, key?: string): string {
    if (!key) key = ENCRYPTION_KEY;
    return AES.decrypt(data, key).toString(enc.Utf8);
  }

  public static validateChar(data: string) {
    return /[^a-zA-Z0-9.,:\-\s@]/g.test(data) ? true : false;
  }
}
