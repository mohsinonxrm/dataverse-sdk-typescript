import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AddSuggestedCards message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AddSuggestedCardsRequestParameters {
  scope: string;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * msdyn_AddSuggestedCards request message
 *
 * Web API Action: msdyn_AddSuggestedCards
 */
export class msdyn_AddSuggestedCardsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AddSuggestedCardsResponse>
{
  declare readonly Parameters: Readonly<msdyn_AddSuggestedCardsRequestParameters>;

  constructor(parameters: msdyn_AddSuggestedCardsRequestParameters) {
    super("msdyn_AddSuggestedCards", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddSuggestedCards`;

    const body = requestBody({
      scope: this.Parameters.scope,
      BusinessProcessFlowId: this.Parameters.BusinessProcessFlowId,
      BusinessProcessFlowInstanceId: this.Parameters.BusinessProcessFlowInstanceId,
      ActionStepId: this.Parameters.ActionStepId,
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

  parseResponse(_response: Response): Promise<msdyn_AddSuggestedCardsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_AddSuggestedCardsResponse());
  }
}

/**
 * msdyn_AddSuggestedCards response message
 */
export class msdyn_AddSuggestedCardsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AddSuggestedCards");
  }

  static fromResponse(_data?: unknown): msdyn_AddSuggestedCardsResponse {
    return new msdyn_AddSuggestedCardsResponse();
  }
}
