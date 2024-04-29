export type InjectToken<T = unknown> = (string | symbol) & { __type__: T };

export type Injects = Record<string, InjectToken>;

export type ExtractParams<Tokens extends Injects> = {
  [K in keyof Tokens]: Tokens[K] extends InjectToken<infer U> ? U : never;
};

export type Constructor<T extends any[]> = new (...args: T) => any;

export type ClassProvider<
  Token extends InjectToken,
  Ctor extends Constructor<[any]>
> = {
  token: Token;
  useClass: Ctor;
};

export type ValueProvider<Token extends InjectToken, Value> = {
  token: Token;
  useValue: Value;
};

export type FactoryProvider<Token extends InjectToken, Value> = {
  token: Token;
  useFactory: () => Value;
};

export type Provider =
  | ClassProvider<InjectToken, any>
  | ValueProvider<InjectToken, any>
  | FactoryProvider<InjectToken, any>;
