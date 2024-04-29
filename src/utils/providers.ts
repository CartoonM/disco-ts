import type {
  Provider,
  ClassProvider,
  ValueProvider,
  FactoryProvider,
  InjectToken,
  Constructor,
} from "./types";

export const isClassProvider = <
  Token extends InjectToken<unknown> = any,
  Ctor extends Constructor<[any]> = any
>(
  provider: Provider
): provider is ClassProvider<Token, Ctor> => {
  return "useClass" in provider;
};

export const isValueProvider = <
  Token extends InjectToken<unknown> = any,
  Value = any
>(
  provider: Provider
): provider is ValueProvider<Token, Value> => {
  return "useValue" in provider;
};

export const isFactoryProvider = <
  Token extends InjectToken<unknown> = any,
  Value = any
>(
  provider: Provider
): provider is FactoryProvider<Token, Value> => {
  return "useFactory" in provider;
};
