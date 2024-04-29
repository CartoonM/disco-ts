import { INJECT_PARAMETERS_METADATA } from "~/constants";

import type { ExtractParams, Constructor, Injects } from "./types";

export function inject<T extends Injects>(params: T) {
  return function (
    target: Constructor<[ExtractParams<T>]>,
    context: ClassDecoratorContext
  ) {
    context.metadata![INJECT_PARAMETERS_METADATA] = params;
    return target;
  };
}
