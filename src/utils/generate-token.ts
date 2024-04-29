import type { InjectToken } from "./types";

export const generateToken = <T>(tag?: string) => Symbol(tag) as InjectToken<T>;
export const gTkn = generateToken;
