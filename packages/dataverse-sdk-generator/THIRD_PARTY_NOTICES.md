# Third-party notices

`@mohsinonxrm/dataverse-sdk-generator` is licensed under the GNU AGPL v3.0. Portions of it are
adapted from the following project, which is licensed under the MIT License. The MIT copyright
and permission notice below applies to those portions.

## dataverse-gen

- Project: <https://github.com/scottdurow/dataverse-gen>
- License: MIT
- Copyright (c) 2020 Scott Durow

Adapted portions:

- `src/schema-model.ts`:
  - the `SchemaModel` design (the `EntityTypes`, `EnumTypes`, `ComplexTypes`, `Actions` and `Functions` collections, and `loadEdmxMetadata()` then `filter()` then enrichment in `generate()`);
  - reading `$metadata` through `xml-js` compact JSON;
  - option-set enum generation, polymorphic lookup consolidation, `getStructuralType()` and `getNavigationName()`.
- `src/metadata-service.ts`: the per-entity `RetrieveMetadataChanges` query and its attribute properties.
- `src/typescript-generator.ts`: the `TypescriptGenerator` design (one `output*()` step per kind of type, rendering EJS templates into `entities/`, `enums/`, `actions/`, `functions/` and `complextypes/`, plus `metadata` and index files).
- `src/types.ts` and `src/cli.ts`: the configuration (`.dataverse-gen.json` with `entities`, `actions`, `functions`, `output.outputRoot`, `output.fileSuffix` and `generateIndex`), and the `init` / `generate` commands.
- `templates/*.ejs`: patterned on dataverse-gen's `_templates`, in particular:
  - the entity metadata object (`typeName`, `logicalName`, `collectionName`, `primaryIdAttribute`, `attributeTypes`, `navigation`);
  - `const enum` option sets;
  - the `parameterTypes` / `structuralProperty` metadata of actions and functions.

Each of these files has a header pointing to this notice.

### MIT License

```text
MIT License

Copyright (c) 2020 Scott Durow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
