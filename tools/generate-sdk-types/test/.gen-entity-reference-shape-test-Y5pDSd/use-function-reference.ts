import { AddPrincipalToQueueAction, MergeAction, WinOpportunityAction, createEntityReference, type EntityReference, type WebApiEntityReference } from "./actions/index.js";
import { MergeRequest, createEntityReference as messageReference, type WebApiEntityReference as MessageWebApiReference } from "./messages/index.js";
import { InitializeFromFunction } from "./functions/index.js";
const wrong = { "@odata.type": "Microsoft.Dynamics.CRM.account", logicalName: "account", id: "a1" };

export const init = new InitializeFromFunction({ EntityMoniker: { ...wrong, entitySetName: "accounts" }, TargetEntityName: "contact" });
