import { AddPrincipalToQueueAction, MergeAction, WinOpportunityAction, createEntityReference, type EntityReference, type WebApiEntityReference } from "./actions/index.js";
import { MergeRequest, createEntityReference as messageReference, type WebApiEntityReference as MessageWebApiReference } from "./messages/index.js";
import { InitializeFromFunction } from "./functions/index.js";
const wrong = { "@odata.type": "Microsoft.Dynamics.CRM.account", logicalName: "account", id: "a1" };

const target: WebApiEntityReference = { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" };
export const merge = new MergeAction({ Target: target, Subordinate: createEntityReference("account", "a2"), PerformParentingChecks: false });
const messageTarget: MessageWebApiReference = { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" };
export const mergeRequest = new MergeRequest({ Target: messageTarget, Subordinate: messageReference("account", "a2"), PerformParentingChecks: false });
export const win = new WinOpportunityAction({ OpportunityClose: { "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose", subject: "Won" }, Status: 3 });
export const add = new AddPrincipalToQueueAction("q1", { Principal: createEntityReference("systemuser", "u1") });
export const unused = wrong;
