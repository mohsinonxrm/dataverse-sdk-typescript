---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

The typed client (`"typedClient": true`) reaches related records, associates them, upserts, calls bound operations and pages (#432):

```typescript
await typed.accounts.byId(id).nav("contact_customer_accounts").list({ select: ["fullname"] });
await typed.accounts.byId(id).associate("contact_customer_accounts", contactId);
await typed.accounts.byId(id).disassociate("primarycontactid");
const accountId = await typed.accounts.upsert({ accountnumber: "A-1" }, { name: "Contoso" });
const total = await typed.accounts.byId(id).actions.contoso_Recalculate({ Mode: "full" });
for await (const account of typed.accounts.iterate({ select: ["name"], pageSize: 500 })) { /* … */ }
const page = await typed.accounts.listPage({ select: ["name"], pageSize: 50 });
```

`client.ts` has an `<Entity>Operations` object for each table with generated actions or functions bound to it (to one record, or to its entity set), passed to its `EntitySetClient`. Custom `client.ejs` templates ejected from an earlier version keep the old output: re-eject and compare (the template gets `operationsName` and `operations` per table).
