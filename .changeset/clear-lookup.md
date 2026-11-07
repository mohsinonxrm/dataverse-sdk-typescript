---
"@mohsinonxrm/dataverse-sdk-entities-runtime": patch
---

`formatEntityForWrite()` clears a lookup set to `null` the way Dataverse expects: `{ primarycontactid: null }` becomes `"primarycontactid@odata.bind": null` (#363). Before, it was sent as `"primarycontactid": null`, which Dataverse rejects because a lookup's logical name isn't a writable property. A polymorphic lookup such as `parentcustomerid` is cleared through the navigation property of each of its targets (`parentcustomerid_account`, `parentcustomerid_contact`).
