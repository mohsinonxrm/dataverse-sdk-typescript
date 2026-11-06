import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_analysisjob, msdyn_solutionhealthruleset } from "./types/index.js";

/**
 * Response from msdyn_CreateNewAnalysisJobForRuleSet action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_CreateNewAnalysisJobForRuleSetResponse extends msdyn_analysisjob {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateNewAnalysisJobForRuleSetResponse;
  }
}
