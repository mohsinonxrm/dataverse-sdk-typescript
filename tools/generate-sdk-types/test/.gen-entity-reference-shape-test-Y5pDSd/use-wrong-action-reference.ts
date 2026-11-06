import { AddPrincipalToQueueAction, MergeAction, WinOpportunityAction, createEntityReference, type EntityReference, type WebApiEntityReference } from "./actions/index.js";
import { MergeRequest, createEntityReference as messageReference, type WebApiEntityReference as MessageWebApiReference } from "./messages/index.js";
import { InitializeFromFunction } from "./functions/index.js";
const wrong = { "@odata.type": "Microsoft.Dynamics.CRM.account", logicalName: "account", id: "a1" };

// @ts-expect-error a variable: neither an EntityReference nor a payload
export const a = new MergeAction({ Target: wrong, Subordinate: createEntityReference("account", "a2"), PerformParentingChecks: false });
// @ts-expect-error an inline literal, as a crmbaseentity parameter
export const b = new MergeAction({ Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", logicalName: "account", id: "a1" }, Subordinate: createEntityReference("account", "a2"), PerformParentingChecks: false });
// @ts-expect-error as a table parameter
export const c = new WinOpportunityAction({ OpportunityClose: { "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose", logicalName: "opportunityclose", id: "o1" }, Status: 3 });
// @ts-expect-error as a principal parameter, which takes only an EntityReference
export const d = new AddPrincipalToQueueAction("q1", { Principal: { "@odata.type": "Microsoft.Dynamics.CRM.systemuser", logicalName: "systemuser", id: "u1" } });
// @ts-expect-error only createEntityReference makes an EntityReference
export const e: EntityReference = wrong;
// @ts-expect-error the JSON shape has no logicalName or id
export const f: WebApiEntityReference = wrong;
