---
"@mohsinonxrm/dataverse-sdk-core": patch
---

`serializeContent()` sends only a typed-array view's own bytes (#34). It used to send the view's whole underlying buffer (`Buffer.from(view.buffer)`), so `new Uint8Array(buf, 10, 5)` or a `subarray()` sent every byte of `buf`: wrong data, and possibly unrelated bytes. It now uses the same rules as the client's request bodies, and detects types with `instanceof` / `ArrayBuffer.isView` instead of `constructor.name`. Its return type is now `BodyInit`.
