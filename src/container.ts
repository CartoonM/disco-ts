import {
  type InjectToken,
  type Injects,
  type Provider,
  type ClassProvider,
  isFactoryProvider,
  isValueProvider,
} from "./helpers/index.js";
import { INJECT_PARAMETERS_METADATA } from "./constants.js";

export class Container {
  private readonly providers = new Map<InjectToken, Provider>();
  private readonly instances = new Map<InjectToken, any>();

  public set(providers: Provider[]): Container;
  public set(provider: Provider): Container;
  public set(provider: Provider | Provider[]) {
    (Array.isArray(provider) ? provider : [provider]).forEach((provider) => {
      this.providers.set(provider.token, provider);
    });

    return this;
  }

  public resolve<T>(token: InjectToken<T>) {
    if (this.instances.has(token)) {
      return this.instances.get(token) as T;
    }

    const provider = this.providers.get(token);
    if (!provider) {
      throw new Error(`No provider found for token ${String(token)}`);
    }

    const value = this.initialize(provider);
    this.instances.set(token, value);

    return value;
  }

  private initialize(provider: Provider) {
    if (isValueProvider(provider)) {
      return provider.useValue;
    }

    if (isFactoryProvider(provider)) {
      return provider.useFactory();
    }

    return this.initClassProvider(provider);
  }

  private initClassProvider(provider: ClassProvider<any, any>) {
    const Ctor = provider.useClass;
    const injects = this.getInjectsFromCtor(Ctor);

    if (this.isInjectsEmpty(injects)) {
      return new Ctor();
    }

    const resolvedInjects: Record<string, any> = {};
    for (const name in injects) {
      const token = injects[name];
      resolvedInjects[name] = this.resolve(token);
    }

    return new Ctor(resolvedInjects);
  }

  private getInjectsFromCtor(target: any): Injects | null {
    return target[Symbol.metadata]?.[INJECT_PARAMETERS_METADATA] || null;
  }

  private isInjectsEmpty(injects: Injects | null) {
    return !injects || !Object.keys(injects).length;
  }
}
