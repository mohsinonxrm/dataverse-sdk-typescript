---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

The typed client (`"typedClient": true`) types `expand` and narrows `select` (#431). `client.ts` has an `<Entity>Navigation` interface per table, one member per navigation property the Web API expands, typed by the related table (`SingleNavigation<Contact, ContactColumn, ContactNavigation>`, `CollectionNavigation<…>`, `ManyToManyNavigation<…>` for a navigation property that is its own partner; a table that isn't generated takes any column), and passes it to `EntitySetClient`. A polymorphic lookup the table's interface shows as one property (`parentcustomerid`) is listed as the Web API's properties, one per target (`parentcustomerid_account`, `parentcustomerid_contact`).

```typescript
const account = await typed.accounts.byId(id).get({
  select: ["name"],
  expand: { primarycontactid: { select: ["fullname"] }, contact_customer_accounts: { top: 5 } },
});
account.primarycontactid?.fullname; // string | null | undefined
account.creditlimit; // error: not selected
```

**Breaking.** (types only, regenerate to get it) Reading a column a literal `select` left out no longer compiles; add it to `select`. A plain name in an `expand` array must be one of the table's navigation properties (names with inline options, `"x($select=…)"`, aren't checked). Custom `client.ejs` templates ejected from an earlier version keep the old output: re-eject and compare (the template gets `navigationName` and `navigation` per table, and `sampleNavigation`).
