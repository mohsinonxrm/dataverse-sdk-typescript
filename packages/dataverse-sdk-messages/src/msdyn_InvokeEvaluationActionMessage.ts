import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InvokeEvaluationActionResponse as msdyn_InvokeEvaluationActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InvokeEvaluationAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeEvaluationActionRequestParameters {
  AdditionalContext?: string;
  ActionPayload: string;
  ActionType: string;
}

/**
 * msdyn_InvokeEvaluationAction request message
 *
 * Web API Action: msdyn_InvokeEvaluationAction
 */
export class msdyn_InvokeEvaluationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeEvaluationActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeEvaluationActionRequestParameters>;

  constructor(parameters: msdyn_InvokeEvaluationActionRequestParameters) {
    super("msdyn_InvokeEvaluationAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeEvaluationAction`;

    const body = requestBody({
      AdditionalContext: this.Parameters.AdditionalContext,
      ActionPayload: this.Parameters.ActionPayload,
      ActionType: this.Parameters.ActionType,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeEvaluationActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InvokeEvaluationActionResponse.fromResponse({});
    return msdyn_InvokeEvaluationActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InvokeEvaluationAction response message
 */
export class msdyn_InvokeEvaluationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeEvaluationActionResponseData) {
    super("msdyn_InvokeEvaluationAction");
  }

  static fromResponse(data: unknown): msdyn_InvokeEvaluationActionResponse {
    return new msdyn_InvokeEvaluationActionResponse(
      responseObject<msdyn_InvokeEvaluationActionResponseData>(data)
    );
  }
}
