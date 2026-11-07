---
"@mohsinonxrm/dataverse-sdk-functions": minor
---

The Web API's 71 query functions are `$filter` helpers now, not classes (#342). **Breaking.**

`$metadata` declares `LastXDays`, `Between`, `In`, `Under`, `EqualUserId`, `InFiscalYear` and the other query functions as functions, so 1.0 generated an `Executable` class for each (`LastXDaysFunction`, `AboveFunction`, …). Dataverse runs them only inside `$filter`: `client.execute(new LastXDaysFunction(...))` sent `GET /LastXDays(...)` and got a 404.

- **Removed:** the 71 classes, their `<Name>FunctionParameters` interfaces and their `<Name>Response` types. The package exports 209 function classes (was 280).
- **Added:** `queryFunctions`, one helper per query function, named in camelCase (`lastXDays`, `in`, `under`, `equalUserId`, …), that returns the `$filter` expression. Its parameters are the `$metadata` ones, typed from it (`PropertyName` is required), and each value is written by core's `odataLiteral`: strings quoted with `'` doubled, `PropertyValues` as a JSON array, numbers as integers. A missing required parameter throws `DataverseInvalidRequestError` (`MissingParameter`).

  ```typescript
  import { odata } from "@mohsinonxrm/dataverse-sdk-core";
  import { queryFunctions } from "@mohsinonxrm/dataverse-sdk-functions";

  await client
    .api("accounts")
    .filter(
      odata.and(
        queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 7 }),
        queryFunctions.equalUserId({ PropertyName: "ownerid" })
      )
    )
    .get();
  ```

- Dataverse refuses `not` around a query function; use the negative one (`notIn`, `notBetween`, `notUnder`, `notEqualUserId`, …).
- The generator recognises a query function by its `$metadata` shape (unbound, returns `Edm.Boolean`, first parameter `PropertyName`), and `regen` checks that these are exactly the operations with no SDK message.
