export {};

declare global {
  interface SymbolConstructor {
    readonly metadata: symbol;
  }
}
