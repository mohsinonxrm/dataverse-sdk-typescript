---
"@mohsinonxrm/dataverse-sdk-core": patch
---

Query options are encoded with `encodeURIComponent` semantics, and a caller's own query string is left as written (#52). `buildUrl` used `URLSearchParams`, which wrote spaces as `+` and `$`, `,`, `:` and `@` as `%XX`, and re-serialized the whole query string, including the part the caller had already encoded. Now builder options read like Microsoft's examples (`$filter=name%20eq%20'x'`), and a query string in the path is kept exactly; only an option the builder sets again replaces the one there. Dataverse accepted both forms (checked live), so requests that worked keep working; URLs in logs are easier to read.
