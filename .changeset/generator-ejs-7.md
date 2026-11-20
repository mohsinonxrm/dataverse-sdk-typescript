---
"@mohsinonxrm/dataverse-sdk-generator": patch
---

`dataverse-gen` renders its templates with ejs 7 (was 3). Generated code is unchanged, and so are custom templates (`"templates"`, `dataverse-gen eject`): `dataverse-gen` passes no EJS options and the same data, so ejs 4–7's changes (options no longer read from the data object, a copy of the data without its prototype, `<%_` `_%>` with custom delimiters) don't apply. ejs 7's ES-module build exports only a default, which the generator now handles; with the plain upgrade, the CLI couldn't render under Node.
