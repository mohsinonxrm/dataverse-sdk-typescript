import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_EvaluateConversation action
 */
export interface msdyn_EvaluateConversationResponse {
  EnrichedEvaluationInsight: string;
  Status: string;
}

/**
 * Parameters of the msdyn_EvaluateConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EvaluateConversationActionParameters {
  AllowCrossGeo?: boolean;
  ConversationPayload?: string;
  CriteriaId: string;
  LangLocale?: string;
  EvaluationId: string;
  ExtendedContext?: string;
  RecordId?: string;
}

/**
 * msdyn_EvaluateConversation action
 *
 * Unbound action
 */
export class msdyn_EvaluateConversationAction implements Executable<msdyn_EvaluateConversationResponse> {
  constructor(public readonly parameters: msdyn_EvaluateConversationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EvaluateConversation`;

    const body = requestBody({
      AllowCrossGeo: this.parameters.AllowCrossGeo,
      ConversationPayload: this.parameters.ConversationPayload,
      CriteriaId: this.parameters.CriteriaId,
      LangLocale: this.parameters.LangLocale,
      EvaluationId: this.parameters.EvaluationId,
      ExtendedContext: this.parameters.ExtendedContext,
      RecordId: this.parameters.RecordId,
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

  async parseResponse(response: Response): Promise<msdyn_EvaluateConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_EvaluateConversationResponse;
    return (await response.json()) as msdyn_EvaluateConversationResponse;
  }
}
