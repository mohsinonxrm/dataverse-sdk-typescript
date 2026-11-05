---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Request builder ergonomics (#49).

- **`prefer()` keeps the chain.** The `PreferBuilder` that `prefer()` returns has `done()`, which returns the request builder: `client.api("accounts").prefer().allAnnotations().done().get()`. `prefer((p) => p.allAnnotations().maxPageSize(50))` configures it in a callback and returns the request builder. Calling `prefer()` again adds to the same preferences.
- **`expand()` takes options.** An `ExpandOptions` object (`select`, `filter`, `orderBy`, `top`, nested `expand`) after a navigation property gives that expansion its options: `.expand("primarycontactid", { select: ["fullname"] })` sends `primarycontactid($select=fullname)`. Before, the object was stringified to `[object Object]`.
- **`expand()` calls add up.** Each call now adds to `$expand` instead of replacing it, so xrm's one call per expansion keeps them all.
