---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

dataverse-gen: opt-in strict nulls (#305). `--strict-nulls`, `"strictNulls": true` in the configuration file, or `strictNulls: true` passed to `generateCode()` types operation responses exactly as `$metadata` declares them. Each complex type an operation returns (directly, nested, or as a base type) gets a `<Name>Output` interface. In it every property is there, and it's `T | null` unless the CSDL declares it `Nullable="false"`. `<Class>Response` and nested properties use it. A primitive, enum or complex return without `Nullable="false"` is `T | null` (a 204 is `null`), and so are the items of such a collection. Entity returns stay `Record | null`, and parameters keep the `<Name>` interfaces with optional properties. The option is off by default, and the default output is unchanged.
