/**
 * #333: type tests (tsd) for the complex and entity types of `types/`, which the package root
 * exports (type-only). Before, it exported only the enums, so these imports didn't compile.
 */
import { expectAssignable, expectNotAssignable, expectType } from "tsd";
import {
  AttributeRequiredLevel,
  type ComplexLookupAttributeMetadata,
  type EntityPayload,
  type opportunityclose,
  type RetrieveVersionResponse,
  type TypedQueryBase,
} from "../src/index.js";

// An entity type
declare const activity: opportunityclose;
expectType<number | undefined>(activity.actualrevenue);
expectType<string | undefined>(activity.subject);
expectAssignable<EntityPayload<opportunityclose>>({
  subject: "Won",
  "opportunityid@odata.bind": "/opportunities(00000000-0000-0000-0000-000000000001)",
});

// A complex type, with the base type's members and an enum-typed one
const lookup: ComplexLookupAttributeMetadata = { Targets: ["account", "contact"] };
expectType<string[] | undefined>(lookup.Targets);
expectAssignable<ComplexLookupAttributeMetadata>({
  RequiredLevel: { Value: AttributeRequiredLevel.None },
});

// A Typed<Name> union: the value says which derived type it is
expectAssignable<TypedQueryBase>({
  "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression",
  Query: "<fetch/>",
});

// The root's RetrieveVersionResponse is the function's response (with @odata.context and a
// required Version), not the complex type of the same name
expectAssignable<RetrieveVersionResponse>({ "@odata.context": "c", Version: "9.2" });
expectNotAssignable<RetrieveVersionResponse>({});
