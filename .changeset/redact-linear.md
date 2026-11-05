---
"@mohsinonxrm/dataverse-sdk-core": patch
---

URL redaction for logs and telemetry (`defaultRedactUrl`) now runs in linear time. Its regex could backtrack polynomially on a path such as `((((…`, so a crafted URL could stall the request thread (CodeQL js/polynomial-redos). The results are unchanged.
