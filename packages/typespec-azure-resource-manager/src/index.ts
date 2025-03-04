export const namespace = "Azure.ResourceManager";

export {
  $armCommonTypesVersion,
  getArmCommonTypeOpenAPIRef,
  getArmCommonTypesVersion,
  getArmCommonTypesVersions,
  getExternalTypeRef,
  isArmCommonType,
  type ArmCommonTypeVersions,
  type ArmCommonTypesResolutionOptions,
} from "./common-types.js";

export * from "./namespace.js";
export * from "./operations.js";
export * from "./resource.js";

export { $lib } from "./lib.js";
export { $linter } from "./linter.js";

export { isAzureResource, isConditionallyFlattened } from "./private.decorators.js";

/** @internal */
export { $decorators } from "./tsp-index.js";
