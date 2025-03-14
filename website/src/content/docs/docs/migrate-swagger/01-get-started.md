---
title: Getting started
order: 0
---

# Getting started with TypeSpec migration

We have created a swagger to TypeSpec conversion tool to help take on the bulk of the manual conversion labor. It can handle both data-plane and management-plane swaggers. The produced TypeSpec relies on the Azure.Core and Azure.Resource.Manager libraries.

**_Important!_** Because TypeSpec is more expressive than Swagger and with the help of evolving Azure libraries, this tool should only be used as an aid in the conversion/migration process, not as the sole tool to produce final version of TypeSpec specs without human inspection, correction and optimization.

## Steps of running the tool

- Ensure [Node.js](https://nodejs.org/en/download/) 18.3 LTS or later is installed.
- Install [`@azure-tools/typespec-client-generator-cli`](https://www.npmjs.com/package/@azure-tools/typespec-client-generator-cli):

### Update existing swagger files

- Run the tool to sort existing swagger so you can easily compare with TypeSpec generated swagger. Please note this functionality has been added in version 0.10.0. Please update to latest if you don't see this command option.

  ```shell
  tsp-client sort-swagger [path to existing swagger]
  ```

- Please check in the updated swaggers in separate PR prior submitting TypeSpec. This will allow you and reviewers to easily see any changes introduced by the TypeSpec conversion.

### Generate TypeSpec with converter

- Install dependencies

  - If you are starting from a scratch folder:

    ```shell
    npm install @azure-tools/typespec-client-generator-cli
    ```

    **_Important!_** If it's not your first time install `@azure-tools/typespec-client-generator-cli`, update by

    ```shell
    npm update @autorest/openapi-to-typespec
    ```

  - If you are starting from [azure-rest-api-specs](https://github.com/Azure/azure-rest-api-specs):
    ```shell
    npm install # Run at root
    ```

- Run the tool from the directory you would like to output your files.

  - Convert a **data-plane** specification:

    ```shell
    tsp-client convert --swagger-readme [path to readme.md]
    ```

  - Convert a **control-plane** specification:

    ```shell
    tsp-client convert --swagger-readme [path to readme.md] --arm
    ```

  - Convert a **control-plane** specification to fully compatible output:

    By default, the converted TypeSpec project will leverage TypeSpec built-in libraries with standard patterns and templates (highly recommended), which will cause discrepancies between the generated TypeSpec and original swagger. If you really don't want this intended discrepancy, add `--fully-compatible` flag to generate a TypeSpec project that is fully compatible with the swagger.

    ```shell
    tsp-client convert --swagger-readme [path to readme.md] --arm --fully-compatible
    ```

- Review generated TypeSpec
- Layout [the TypeSpec project folders appropriately](https://github.com/Azure/azure-rest-api-specs/blob/main/documentation/typespec-structure-guidelines.md).
- Leverage standard `tspconfig.yaml` ([Template projects](https://github.com/microsoft/typespec/tree/main/eng/feeds)) and make appropriate output file name changes.
- Ensure it compiles successfully locally

### Review and adjust the TypeSpec

This is the probably most critical step of the conversion. As you have pre-sorted the swagger files in the first step, you would see the delta introduced in swagger.

- Review and make appropriate changes to ensure minimal changes for swagger.You can check the migration Tips for commonly asked questions and solutions.
- Run the `compare` command to see the differences between the original swagger and the TypeSpec-generated one. This command performs an expansion and transformation that will help eliminate diffs in the actual Swagger that don't matter, either because the constructs are functionally equivalent or because we have determined that a potential diff does not represent a functional difference in the REST API (it might impact SDKs, but there are other tools for that).

  ```shell
  tsp-client compare --lhs [path to hand-authored Swagger(s)] --rhs [path to TypeSpec project] --compile-tsp
  ```

  For more info on this command and its options, see the [README](https://github.com/tjprescott/openapi-diff/blob/main/README.md) for the underlying tool. `tsp-client compare` is simply a wrapper around this tool.

  Once run, you can use a visual diff tool to compare `output/lhs.json` and `output/rhs.json` to visually see the differences that matter in the transformed Swagger and can use that to trace back to the TypeSpec to make the necessary changes. You can also look at `output/diff.json` to the differences as individual JSON objects. These may be easier to read than the visual diff and may contain additional details on why a diff matters.

- Review any custom operation template introduced. The goal is to use the built-in templates from `Azure.Core` and `Azure.Resource.Manager`.
- Review any #FixMe generated by the converter
- Review any warnings
- Avoid large monolithic files. We recommend modularize models and operations into separate files for easy maintenance.

### Create Spec PR with new TypeSpec project

- Review CI checks such as breaking changes and other failures.

## How to Get Help

- Ask questions in the [TypeSpec Discussions Channel](https://teams.microsoft.com/l/channel/19%3a906c1efbbec54dc8949ac736633e6bdf%40thread.skype/TypeSpec%2520Discussion%2520%25F0%259F%2590%25AE?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47)
- Attend TypeSpec office hours. The office hours is listed on top tabs on the discussion channel.
- File issues in the [typespec-azure github repo](https://github.com/azure/typespec-azure/issues)
  - For bugs, please include:
    - A high-level description of the bug
    - Expected and Actual Results
    - Repro steps, including any TypeSpec code that you used
    - Any error messages you saw, including stack traces. For issues with VS or VS Code tooling see [Troubleshooting VSCode Tooling and Filing Issues](../typespec-getting-started.md#troubleshooting-vscode-tooling-and-filing-issues)
- Schedule review meetings with TypeSpec team.
