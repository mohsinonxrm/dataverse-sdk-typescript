/**
 * #96: type tests (tsd) for the options-object constructors. RetrieveEntity took
 * `(EntityFilters, LogicalName, MetadataId, RetrieveAsIfPublished)` positionally, so swapping
 * LogicalName and MetadataId (both strings) compiled; now each value is named.
 */
import { expectError, expectType } from "tsd";
import {
  RetrieveEntityFunction,
  type RetrieveEntityFunctionParameters,
} from "../src/RetrieveEntityFunction.js";
import { RetrieveMetadataChangesFunction } from "../src/RetrieveMetadataChangesFunction.js";
import { RetrieveUserPrivilegeByPrivilegeNameFunction } from "../src/RetrieveUserPrivilegeByPrivilegeNameFunction.js";
import { WhoAmIFunction } from "../src/WhoAmIFunction.js";
import { EntityFilters } from "../src/types/index.js";

const EMPTY = "00000000-0000-0000-0000-000000000000";

new RetrieveEntityFunction({
  EntityFilters: EntityFilters.Entity | EntityFilters.Attributes,
  LogicalName: "account",
  MetadataId: EMPTY,
  RetrieveAsIfPublished: false,
});
// LogicalName is nullable in the CSDL, so it can be left out; MetadataId can't
new RetrieveEntityFunction({
  EntityFilters: "Entity",
  MetadataId: EMPTY,
  RetrieveAsIfPublished: true,
});
expectError(
  new RetrieveEntityFunction({
    EntityFilters: "Entity",
    LogicalName: "account",
    RetrieveAsIfPublished: false,
  })
);
expectError(
  new RetrieveEntityFunction({
    EntityFilters: "Bogus",
    MetadataId: EMPTY,
    RetrieveAsIfPublished: false,
  })
);
expectError(new RetrieveEntityFunction(EntityFilters.Entity, "account", EMPTY, false));
expectType<string | undefined>(
  new RetrieveEntityFunction({
    EntityFilters: "Entity",
    MetadataId: EMPTY,
    RetrieveAsIfPublished: false,
  }).parameters.LogicalName
);
expectType<RetrieveEntityFunctionParameters>(
  new RetrieveEntityFunction({
    EntityFilters: "Entity",
    MetadataId: EMPTY,
    RetrieveAsIfPublished: false,
  }).parameters
);

// Only optional parameters: the object can be left out
new RetrieveMetadataChangesFunction();
new RetrieveMetadataChangesFunction({ ClientVersionStamp: "1!2" });

// A bound function: the record id, then the parameters
new RetrieveUserPrivilegeByPrivilegeNameFunction(EMPTY, { PrivilegeName: "prvReadAccount" });
expectError(new RetrieveUserPrivilegeByPrivilegeNameFunction(EMPTY, "prvReadAccount"));

// No parameters
new WhoAmIFunction();
