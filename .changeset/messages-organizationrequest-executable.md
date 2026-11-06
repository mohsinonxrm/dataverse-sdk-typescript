---
"@mohsinonxrm/dataverse-sdk-messages": minor
---

The generic `OrganizationRequest` can be executed (#80).

`OrganizationRequest` now implements `Executable<OrganizationResponse>`, so `service.execute(new OrganizationRequest("new_CustomAction", { … }))` and `client.execute(…)` work instead of throwing "Request must implement Executable<T>".

- It runs as a Web API action: `POST /{messageName}` with `Parameters` as the JSON body. A new third constructor argument, `{ boundTo: { entitySetName, id } }`, sends it to `POST /{entitySetName}({id})/Microsoft.Dynamics.CRM.{messageName}` instead.
- `OrganizationResponse.Results` holds the response's properties without the `@odata.*` annotations, and is empty for `204 No Content`.
- Typed message classes keep their own `toRequestInformation()` and `parseResponse()`.
- The messages README and the mapping docs show the escape hatch with the real behaviour.
