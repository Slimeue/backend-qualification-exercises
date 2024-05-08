import { th } from "@faker-js/faker";
import { randomBytes } from "crypto";

export class ObjectId {
  private data: Buffer;
  private static prevTimeStamp: number;
  private static counter: number = 0;

  constructor(type: number, timestamp: number) {
    /**
     * insert your code here
     */

    this.data = Buffer.alloc(14);

    this.data.writeUInt8(type, 0);

    if (ObjectId.prevTimeStamp === timestamp) {
      ObjectId.counter = (ObjectId.counter + 1) % 0xffffff;
    } else {
      ObjectId.counter = Math.floor(Math.random() * 0xffffff);
      ObjectId.prevTimeStamp = timestamp;
    }

    this.data.writeBigUInt64BE(BigInt(timestamp), 0);
    this.data.writeUIntBE(ObjectId.counter, 11, 3);
  }

  static generate(type?: number): ObjectId {
    return new ObjectId(type ?? 0, Date.now());
  }

  toString(encoding?: "hex" | "base64"): string {
    return this.data.toString(encoding ?? "hex");
  }
}
