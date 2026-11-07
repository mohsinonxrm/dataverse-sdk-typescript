import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return msdyn_CreateNewAnalysisJobForRuleSetResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_CreateNewAnalysisJobForRuleSetResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateNewAnalysisJobForRuleSet action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_CreateNewAnalysisJobForRuleSetResult =
  | (msdyn_analysisjob & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * msdyn_CreateNewAnalysisJobForRuleSet response message
 *
 * `result` is the value the msdyn_CreateNewAnalysisJobForRuleSet action returns (see {@link msdyn_CreateNewAnalysisJobForRuleSetResult}).
 */
export class msdyn_CreateNewAnalysisJobForRuleSetResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateNewAnalysisJobForRuleSetResult) {
    super("msdyn_CreateNewAnalysisJobForRuleSet");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateNewAnalysisJobForRuleSetResponse {
    return new msdyn_CreateNewAnalysisJobForRuleSetResponse(
      (data ?? null) as msdyn_CreateNewAnalysisJobForRuleSetResult
    );
  }
}
