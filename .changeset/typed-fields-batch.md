---
"@mohsinonxrm/dataverse-sdk-batch": minor
---

`BatchRequestBuilder.addRequest()` and `BatchRequestStep.method` take a `BatchMethod` (#480): core's `HttpMethod` (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`) in upper or lower case, so a misspelt method is a compile error. `BatchMethod` is exported.

What narrows: a method passed as a plain `string` variable, or one outside those five (such as `HEAD` or `MERGE`), no longer compiles. Nothing changes at run time: the method is still upper-cased and checked as an HTTP token.
