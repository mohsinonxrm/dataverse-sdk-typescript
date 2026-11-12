---
"@mohsinonxrm/dataverse-sdk-core": minor
---

`FeatureUsageFlag` is a const object instead of a TypeScript `enum` (#479), and its type is `number` (a flag or a combination of flags). `FeatureUsageFlag.RETRY_ENABLED`, `addFeature()`, `hasFeature()` and `getEnabledFeatures()` work as before; `getEnabledFeatures()` no longer relies on the enum's reverse mapping. What no longer works: the reverse mapping itself (`FeatureUsageFlag[1]` to get `"RETRY_ENABLED"`).
