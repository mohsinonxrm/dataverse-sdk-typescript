/**
 * #96: type tests (tsd) for the options-object constructors of the messages, which keep their
 * parameters in `OrganizationRequest.Parameters` as the .NET SDK does.
 */
import { expectAssignable, expectError, expectType } from "tsd";
import { MergeRequest, type MergeRequestParameters } from "../src/MergeMessage.js";
import { ExecuteWorkflowRequest } from "../src/ExecuteWorkflowMessage.js";
import { OrganizationRequest } from "../src/OrganizationRequest.js";
import { createEntityReference } from "../src/EntityReference.js";

const target = createEntityReference("account", "00000000-0000-0000-0000-000000000001");
const subordinate = createEntityReference("account", "00000000-0000-0000-0000-000000000002");

// UpdateContent is nullable in the CSDL; the other three are required
const merge = new MergeRequest({
  Target: target,
  Subordinate: subordinate,
  PerformParentingChecks: false,
});
new MergeRequest({
  Target: target,
  Subordinate: subordinate,
  UpdateContent: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Merged" },
  PerformParentingChecks: true,
});
expectError(new MergeRequest({ Target: target, Subordinate: subordinate }));
expectError(new MergeRequest({ Target: target, PerformParentingChecks: false }));
expectError(new MergeRequest(target, subordinate, undefined, false));

// Parameters holds them, read-only, and the request is still an OrganizationRequest
expectType<Readonly<MergeRequestParameters>>(merge.Parameters);
expectError((merge.Parameters.PerformParentingChecks = true));
expectAssignable<OrganizationRequest>(merge);
expectType<string>(merge.messageName);

// A bound message: the record id first
new ExecuteWorkflowRequest("00000000-0000-0000-0000-000000000003", {
  EntityId: "00000000-0000-0000-0000-000000000004",
});
expectError(new ExecuteWorkflowRequest("w1"));
expectError(new ExecuteWorkflowRequest("w1", "e1"));
