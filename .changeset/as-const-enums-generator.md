---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

dataverse-gen writes each enum as a const object and a type of the same name instead of `export const enum` (#479), so the generated code compiles with `erasableSyntaxOnly` and runs under Node's type stripping, and `isolatedModules` consumers can use the enums at runtime. `account_industrycode.Accounting` and `x: account_industrycode` work as before.

- Option sets (local choices, and a `$metadata` enum used as a choice column's global option set) keep their numbers: `export const account_industrycode = { Accounting: 1, … } as const;` with `type account_industrycode` the union of the values.
- **CSDL enum types now have their member names as values** (`contoso_Priority.High === "High"`), which is what the Web API reads and writes; each member's comment gives its number. An action body or a function parameter sends the value as it is, so `bodyValue()` and `parameterValue()` convert only flags enums now, and an operation that returns such an enum is typed with the enum instead of `string`. Code that passed or compared the numbers of a non-flags CSDL enum needs the member (or its name) instead.
- Flags enums (`IsFlags="true"`, such as `AccessRights`) keep their numbers and are typed `number`, so members combine with `|`; they're sent as member names as before.
- Generated actions and functions declare their constructor arguments as fields and assign them, instead of parameter properties, which `erasableSyntaxOnly` also rejects. The templates get the arguments as `constructorParameters` (`{ name, type, defaultValue? }`); `constructorArguments` is still passed, for custom templates.

What no longer works: an enum's reverse mapping (`account_industrycode[1]` to get `"Accounting"`), and assigning a `number` that isn't a member to an option set type. Custom `enum.ejs`, `action.ejs` or `function.ejs` templates ejected from an earlier version keep writing the old output: re-eject and compare.
