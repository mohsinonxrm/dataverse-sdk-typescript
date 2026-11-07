/**
 * #333: type tests (tsd) for the complex and entity types of `types/`, which the package root
 * exports (type-only). Before, it exported only the enums, so these imports didn't compile.
 */
import { expectAssignable, expectType } from "tsd";
import {
  AddToQueueResponse,
  AttributeRequiredLevel,
  WinOpportunityRequest,
  type AddToQueueResult,
  type ComplexLookupAttributeMetadata,
  type EntityPayload,
  type opportunityclose,
  type TypedQueryBase,
  type WinOpportunityRequestParameters,
} from "../src/index.js";

// An entity type, as the payload of an entity-typed parameter
const close: EntityPayload<opportunityclose> = {
  "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
  subject: "Won",
  "opportunityid@odata.bind": "/opportunities(00000000-0000-0000-0000-000000000001)",
};
new WinOpportunityRequest({ OpportunityClose: close, Status: 3 });
expectAssignable<WinOpportunityRequestParameters["OpportunityClose"]>(close);
declare const activity: opportunityclose;
expectType<number | undefined>(activity.actualrevenue);

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

// The root's AddToQueueResponse is the message's response class, not the complex type of the
// same name
declare const response: AddToQueueResponse;
expectType<AddToQueueResult>(response.result);
expectType<string>(response.result.QueueItemId);
