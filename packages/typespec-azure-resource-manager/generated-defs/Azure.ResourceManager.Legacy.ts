import type { DecoratorContext, Model, ModelProperty } from "@typespec/compiler";

/**
 * This decorator is used on resources that do not satisfy the definition of a resource
 * but need to be identified as such.
 */
export type CustomAzureResourceDecorator = (context: DecoratorContext, target: Model) => void;

/**
 * Specify an external reference that should be used when emitting this type.
 *
 * @param jsonRef External reference(e.g. "../../common.json#/definitions/Foo")
 */
export type ExternalTypeRefDecorator = (
  context: DecoratorContext,
  entity: Model | ModelProperty,
  jsonRef: string,
) => void;

export type AzureResourceManagerLegacyDecorators = {
  customAzureResource: CustomAzureResourceDecorator;
  externalTypeRef: ExternalTypeRefDecorator;
};
