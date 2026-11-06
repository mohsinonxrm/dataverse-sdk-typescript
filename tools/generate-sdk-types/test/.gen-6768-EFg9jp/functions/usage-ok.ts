import { EntityFilters, RetrieveEntityFunction, LocalTimeFromUtcTimeFunction, GetChangesFunction } from "./index.js";
new RetrieveEntityFunction({
  EntityFilters: EntityFilters.Entity | EntityFilters.Attributes,
  LogicalName: "account",
  MetadataId: "00000000-0000-0000-0000-000000000000",
  RetrieveAsIfPublished: false,
});
new RetrieveEntityFunction({ EntityFilters: "Entity", MetadataId: "00000000-0000-0000-0000-000000000000", RetrieveAsIfPublished: false });
new LocalTimeFromUtcTimeFunction({ TimeZoneCode: 85, UtcTime: new Date() });
new GetChangesFunction({ Stamp: "s1" });
