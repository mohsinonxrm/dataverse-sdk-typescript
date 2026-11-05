---
"@mohsinonxrm/dataverse-sdk-core": patch
---

Fix request bodies being JSON-stringified whatever their type (#7). Plain objects and arrays are still serialised to JSON. Strings, `ArrayBuffer`, typed arrays and `DataView`, `Blob`, `FormData`, `URLSearchParams` and `ReadableStream` now reach `fetch` unchanged, so raw JSON text, multipart `$batch` bodies, XML and binary file content are sent byte for byte. A typed-array view sends only its own bytes. The default `content-type: application/json; charset=utf-8` is added only for JSON-serialised bodies and strings, and never overrides the caller's. Stream bodies are sent half-duplex and never retried. New type export: `RawBody`.
