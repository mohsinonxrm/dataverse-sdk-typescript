import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_InvokeEvaluationActionResponse as msdyn_InvokeEvaluationActionResponseData } from "./types/index.js";

/**
 * msdyn_InvokeEvaluationAction request message
 *
 * Web API Action: msdyn_InvokeEvaluationAction
 */
export class msdyn_InvokeEvaluationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeEvaluationActionResponse>
{
  constructor(
    public additionalContext: string | undefined,
    public actionPayload: string,
    public actionType: string
  ) {
    super("msdyn_InvokeEvaluationAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeEvaluationAction`;

    const body: Record<string, unknown> = {
      AdditionalContext: this.additionalContext,
      ActionPayload: this.actionPayload,
      ActionType: this.actionType,
    };

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
    const data = await response.json();
    return msdyn_InvokeEvaluationActionResponse.fromResponse(data);
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
