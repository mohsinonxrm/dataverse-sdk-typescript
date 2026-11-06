import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_PushActionDataToRecommendedActionAgent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_PushActionDataToRecommendedActionAgentResponse = void;

/**
 * Parameters of the msdyn_PushActionDataToRecommendedActionAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PushActionDataToRecommendedActionAgentActionParameters {
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
 * msdyn_PushActionDataToRecommendedActionAgent action
 *
 * Unbound action
 */
export class msdyn_PushActionDataToRecommendedActionAgentAction implements Executable<msdyn_PushActionDataToRecommendedActionAgentResponse> {
  constructor(
    public readonly parameters: msdyn_PushActionDataToRecommendedActionAgentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PushActionDataToRecommendedActionAgent`;

    const body = requestBody({
      msdyn_ActionPrioritizationData: this.parameters.msdyn_ActionPrioritizationData,
      msdyn_ActionCTA: this.parameters.msdyn_ActionCTA,
      msdyn_TargetEntityId: this.parameters.msdyn_TargetEntityId,
      msdyn_SourceAgentId: this.parameters.msdyn_SourceAgentId,
      msdyn_ActionUIPayload: this.parameters.msdyn_ActionUIPayload,
      msdyn_ActionId: this.parameters.msdyn_ActionId,
      msdyn_TargetEntityTypeName: this.parameters.msdyn_TargetEntityTypeName,
      msdyn_PrioritizationPrinciples: this.parameters.msdyn_PrioritizationPrinciples,
      msdyn_ActionOwners: this.parameters.msdyn_ActionOwners,
      msdyn_ActionReason: this.parameters.msdyn_ActionReason,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_PushActionDataToRecommendedActionAgentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
