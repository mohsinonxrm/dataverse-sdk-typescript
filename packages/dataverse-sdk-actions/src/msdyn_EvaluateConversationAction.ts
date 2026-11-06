import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_EvaluateConversation action
 */
export interface msdyn_EvaluateConversationResponse {
  Status: string;
  EnrichedEvaluationInsight: string;
}

/**
 * Parameters of the msdyn_EvaluateConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EvaluateConversationActionParameters {
  CriteriaId: string;
  ExtendedContext?: string;
  ConversationPayload?: string;
  LangLocale?: string;
  EvaluationId: string;
  AllowCrossGeo?: boolean;
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
      CriteriaId: this.parameters.CriteriaId,
      ExtendedContext: this.parameters.ExtendedContext,
      ConversationPayload: this.parameters.ConversationPayload,
      LangLocale: this.parameters.LangLocale,
      EvaluationId: this.parameters.EvaluationId,
      AllowCrossGeo: this.parameters.AllowCrossGeo,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_EvaluateConversationResponse;
  }
}
