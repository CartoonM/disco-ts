export type {};

declare global {
  interface SymbolConstructor {
    readonly metadata: symbol;
  }
}
