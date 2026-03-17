---
changeKind: feature
packages:
  - "@azure-tools/typespec-azure-core"
---

Add `ResourceHead` standard operation template to `Azure.Core.ResourceOperations` interface for HEAD operations. Also exempt HEAD operations from the `no-response-body` linting rule.