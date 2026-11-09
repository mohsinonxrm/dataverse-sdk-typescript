import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_analysisjob, msdyn_solutionhealthruleset } from "./types/index.js";

/**
 * Response from the msdyn_CreateNewAnalysisJobForRuleSet action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_CreateNewAnalysisJobForRuleSetResponse =
  | (msdyn_analysisjob & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * Parameters of the msdyn_CreateNewAnalysisJobForRuleSet action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateNewAnalysisJobForRuleSetActionParameters {
  SolutionHealthRuleSet: EntityReference | EntityPayload<msdyn_solutionhealthruleset>;
  TriggerType?: string;
  InAppNotificationEnabled?: boolean;
}

/**
 * msdyn_CreateNewAnalysisJobForRuleSet action
 *
 * Unbound action
 */
export class msdyn_CreateNewAnalysisJobForRuleSetAction implements Executable<msdyn_CreateNewAnalysisJobForRuleSetResponse> {
  constructor(public readonly parameters: msdyn_CreateNewAnalysisJobForRuleSetActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateNewAnalysisJobForRuleSet`;

    const body = requestBody({
      SolutionHealthRuleSet: this.parameters.SolutionHealthRuleSet,
      TriggerType: this.parameters.TriggerType,
      InAppNotificationEnabled: this.parameters.InAppNotificationEnabled,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateNewAnalysisJobForRuleSetResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_CreateNewAnalysisJobForRuleSetResponse;
  }
}
