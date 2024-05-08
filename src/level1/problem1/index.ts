import { o } from "ramda";

export type Value =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | Buffer
  | Map<unknown, unknown>
  | Set<unknown>
  | Array<Value>
  | { [key: string]: Value };

/**
 * Transforms JavaScript scalars and objects into JSON
 * compatible objects.
 */
export function serialize(value: Value): unknown {
  /**
   * insert your code here
   */

  if (value === null) return null;

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "undefined"
  ) {
    return value;
  }

  if (value instanceof Map) {
    const arr = Array.from(value);
    return { __t: "Map", __v: arr };
  }

  if (value instanceof Set) {
    return { __t: "Set", __v: Array.from(value) };
  }

  if (value instanceof Date) {
    const date = value.getTime();
    return { __t: "Date", __v: date };
  }

  if (value instanceof Buffer) {
    const buffer = Array.from(value);
    return { __t: "Buffer", __v: buffer };
  }

  if (Array.isArray(value)) {
    return value.map(serialize);
  }

  if (value instanceof Object) {
    const obj: { [key: string]: unknown } = {};
    for (const key in value) {
      obj[key] = serialize(value[key]);
    }
    return obj;
  }
}

/**
 * Transforms JSON compatible scalars and objects into JavaScript
 * scalar and objects.
 */
export function deserialize<T = unknown>(value: unknown): T {
  /**
   * insert your code here
   */
  if (value === null || value === undefined) return value as T;

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
    return value as T;

  if (Array.isArray(value)) {
    return value.map(deserialize) as T;
  }

  if (typeof value === "object") {
    const obj = value as { [key: string]: unknown };
    if (obj.__t === "Map") {
      return new Map(obj.__v as []) as T;
    }

    if (obj.__t === "Set") {
      return new Set(obj.__v as string) as T;
    }

    if (obj.__t === "Buffer") {
      return Buffer.from(obj.__v as string) as T;
    }

    if (obj.__t === "Date") {
      return new Date(obj.__v as number) as T;
    }

    const o: { [key: string]: unknown } = {};
    for (const key in obj) {
      o[key] = deserialize(obj[key]);
    }
    return o as T;
  }

  return;
}
