import { AddPrincipalToQueueAction, MergeAction, WinOpportunityAction, createEntityReference, type EntityReference, type WebApiEntityReference } from "./actions/index.js";
import { MergeRequest, createEntityReference as messageReference, type WebApiEntityReference as MessageWebApiReference } from "./messages/index.js";
import { InitializeFromFunction } from "./functions/index.js";
const wrong = { "@odata.type": "Microsoft.Dynamics.CRM.account", logicalName: "account", id: "a1" };

// @ts-expect-error neither an EntityReference nor a payload
export const a = new MergeRequest({ Target: wrong, Subordinate: messageReference("account", "a2"), PerformParentingChecks: false });
// @ts-expect-error UpdateContent is a payload, and logicalName isn't a column
export const b = new MergeRequest({ Target: messageReference("account", "a1"), Subordinate: messageReference("account", "a2"), UpdateContent: wrong, PerformParentingChecks: false });
