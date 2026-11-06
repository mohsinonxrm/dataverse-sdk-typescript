import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_analysisjob, msdyn_solutionhealthruleset } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateNewAnalysisJobForRuleSet message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateNewAnalysisJobForRuleSetRequestParameters {
  SolutionHealthRuleSet: EntityReference | EntityPayload<msdyn_solutionhealthruleset>;
  TriggerType?: string;
  InAppNotificationEnabled?: boolean;
}

/**
 * msdyn_CreateNewAnalysisJobForRuleSet request message
 *
 * Web API Action: msdyn_CreateNewAnalysisJobForRuleSet
 */
export class msdyn_CreateNewAnalysisJobForRuleSetRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateNewAnalysisJobForRuleSetResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateNewAnalysisJobForRuleSetRequestParameters>;

  constructor(parameters: msdyn_CreateNewAnalysisJobForRuleSetRequestParameters) {
    super("msdyn_CreateNewAnalysisJobForRuleSet", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateNewAnalysisJobForRuleSet`;

    const body = requestBody({
      SolutionHealthRuleSet: this.Parameters.SolutionHealthRuleSet,
      TriggerType: this.Parameters.TriggerType,
      InAppNotificationEnabled: this.Parameters.InAppNotificationEnabled,
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
    return msdyn_CreateNewAnalysisJobForRuleSetResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CreateNewAnalysisJobForRuleSet response message
 */
export class msdyn_CreateNewAnalysisJobForRuleSetResponse extends OrganizationResponse {
  constructor(public result: msdyn_analysisjob) {
    super("msdyn_CreateNewAnalysisJobForRuleSet");
  }

  static fromResponse(data: unknown): msdyn_CreateNewAnalysisJobForRuleSetResponse {
    return new msdyn_CreateNewAnalysisJobForRuleSetResponse(
      responseObject<msdyn_analysisjob>(data)
    );
  }
}
