---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-batch": patch
---

`bindMany()` works without the batch package, and `associate()` works against Dataverse (#20).

- **`bindMany()` without an executor.** The executor argument is now optional. Without it, `bindMany()` sends one `POST …/{nav}/$ref` per id, in order, through the client's pipeline, and stops at the first failure. Pass `createBindManyExecutor()` to send a single `$batch` instead. No `eval` or `new Function` is involved, so it works under a strict CSP, and the browser smoke test checks that.
- **`associate()` sends an absolute `@odata.id`.** Dataverse rejected the relative `/contacts(id)` it used to send with "the odata.context annotation is missing from the payload", so `associate()`, and with it `bindMany()`, never worked live. The batch package's `createBindManyExecutor()` gets the same fix.
- **Lint.** `no-eval`, `no-new-func` and `@typescript-eslint/no-implied-eval` are now errors.
