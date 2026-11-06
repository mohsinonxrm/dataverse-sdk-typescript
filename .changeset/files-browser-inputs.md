---
"@mohsinonxrm/dataverse-sdk-files": minor
---

`FileColumnClient` works in browsers without a `Buffer` polyfill (#58).

- **No `Buffer`.** `upload()` called `Buffer.isBuffer(file)` with no guard, so every upload in a browser threw `ReferenceError: Buffer is not defined` before sending anything. Bytes and base64 are now handled with `Uint8Array` and `btoa`, which exist in browsers and in Node.js.
- **More input types.** `upload()` takes a `Blob` (or `File`), an `ArrayBuffer`, or any typed-array view such as `Uint8Array`. A Node.js `Buffer` is a `Uint8Array`, so it still works. A view uploads only the bytes it covers.
- **`download()` returns a `Blob`.** The return type is now `Promise<Blob>` instead of `Promise<Blob | Buffer>`, so browser consumers no longer need `@types/node`. Node.js 22 has `Blob`, and it already got one at runtime. Use `Buffer.from(await blob.arrayBuffer())` for a `Buffer`.
