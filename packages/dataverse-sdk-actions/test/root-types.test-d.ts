/**
 * #333: type tests (tsd) for the complex and entity types of `types/`, which the package root
 * exports (type-only). Before, it exported only the enums, so these imports didn't compile.
 */
import { expectAssignable, expectNotAssignable, expectType } from "tsd";
import {
  AttributeRequiredLevel,
  WinOpportunityAction,
  type AddToQueueResponse,
  type ComplexLookupAttributeMetadata,
  type EntityPayload,
  type opportunityclose,
  type TypedQueryBase,
  type WinOpportunityActionParameters,
} from "../src/index.js";

// An entity type, as the payload of an entity-typed parameter
const close: EntityPayload<opportunityclose> = {
  "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
  subject: "Won",
  "opportunityid@odata.bind": "/opportunities(00000000-0000-0000-0000-000000000001)",
};
new WinOpportunityAction({ OpportunityClose: close, Status: 3 });
expectAssignable<WinOpportunityActionParameters["OpportunityClose"]>(close);
declare const activity: opportunityclose;
expectType<number | undefined>(activity.actualrevenue);
expectType<string | undefined>(activity.subject);

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

// The root's AddToQueueResponse is the action's response (with @odata.context), not the complex
// type of the same name
expectAssignable<AddToQueueResponse>({ "@odata.context": "c", QueueItemId: "q1" });
expectNotAssignable<AddToQueueResponse>({});
