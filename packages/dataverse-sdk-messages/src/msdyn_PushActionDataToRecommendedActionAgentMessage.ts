import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PushActionDataToRecommendedActionAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PushActionDataToRecommendedActionAgentRequestParameters {
  msdyn_ActionPrioritizationData?: string;
  msdyn_ActionCTA?: string;
  msdyn_TargetEntityId: string;
  msdyn_SourceAgentId: string;
  msdyn_ActionUIPayload?: string;
  msdyn_ActionId: string;
  msdyn_TargetEntityTypeName: string;
  msdyn_PrioritizationPrinciples?: string;
  msdyn_ActionOwners?: string;
  msdyn_ActionReason: string;
}

/**
 * msdyn_PushActionDataToRecommendedActionAgent request message
 *
 * Web API Action: msdyn_PushActionDataToRecommendedActionAgent
 */
export class msdyn_PushActionDataToRecommendedActionAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_PushActionDataToRecommendedActionAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_PushActionDataToRecommendedActionAgentRequestParameters>;

  constructor(parameters: msdyn_PushActionDataToRecommendedActionAgentRequestParameters) {
    super("msdyn_PushActionDataToRecommendedActionAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PushActionDataToRecommendedActionAgent`;

    const body = requestBody({
      msdyn_ActionPrioritizationData: this.Parameters.msdyn_ActionPrioritizationData,
      msdyn_ActionCTA: this.Parameters.msdyn_ActionCTA,
      msdyn_TargetEntityId: this.Parameters.msdyn_TargetEntityId,
      msdyn_SourceAgentId: this.Parameters.msdyn_SourceAgentId,
      msdyn_ActionUIPayload: this.Parameters.msdyn_ActionUIPayload,
      msdyn_ActionId: this.Parameters.msdyn_ActionId,
      msdyn_TargetEntityTypeName: this.Parameters.msdyn_TargetEntityTypeName,
      msdyn_PrioritizationPrinciples: this.Parameters.msdyn_PrioritizationPrinciples,
      msdyn_ActionOwners: this.Parameters.msdyn_ActionOwners,
      msdyn_ActionReason: this.Parameters.msdyn_ActionReason,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_PushActionDataToRecommendedActionAgentResponse> {
    // No return value (204 No Content)
    return new msdyn_PushActionDataToRecommendedActionAgentResponse();
  }
}

/**
 * msdyn_PushActionDataToRecommendedActionAgent response message
 */
export class msdyn_PushActionDataToRecommendedActionAgentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PushActionDataToRecommendedActionAgent");
  }

  static fromResponse(_data: unknown): msdyn_PushActionDataToRecommendedActionAgentResponse {
    return new msdyn_PushActionDataToRecommendedActionAgentResponse();
  }
}
