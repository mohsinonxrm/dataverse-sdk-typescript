import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AddSuggestedCards request message
 *
 * Web API Action: msdyn_AddSuggestedCards
 */
export class msdyn_AddSuggestedCardsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AddSuggestedCardsResponse>
{
  constructor(
    public scope: string,
    public businessProcessFlowId: string,
    public businessProcessFlowInstanceId: string,
    public actionStepId: string
  ) {
    super("msdyn_AddSuggestedCards");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddSuggestedCards`;

    const body: Record<string, unknown> = {
      scope: this.scope,
      BusinessProcessFlowId: this.businessProcessFlowId,
      BusinessProcessFlowInstanceId: this.businessProcessFlowInstanceId,
      ActionStepId: this.actionStepId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AddSuggestedCardsResponse> {
    // No return value (204 No Content)
    return new msdyn_AddSuggestedCardsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      scope: this.scope,
      BusinessProcessFlowId: this.businessProcessFlowId,
      BusinessProcessFlowInstanceId: this.businessProcessFlowInstanceId,
      ActionStepId: this.actionStepId,
    };
  }
}

/**
 * msdyn_AddSuggestedCards response message
 */
export class msdyn_AddSuggestedCardsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AddSuggestedCards");
  }

  static fromResponse(_data: unknown): msdyn_AddSuggestedCardsResponse {
    return new msdyn_AddSuggestedCardsResponse();
  }
}
