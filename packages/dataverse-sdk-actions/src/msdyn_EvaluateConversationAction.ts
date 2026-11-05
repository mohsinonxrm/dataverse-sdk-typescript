import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_EvaluateConversation action
 */
export interface msdyn_EvaluateConversationResponse {
  Status: string;
  EnrichedEvaluationInsight: string;
}

/**
 * msdyn_EvaluateConversation action
 *
 * Unbound action
 */
export class msdyn_EvaluateConversationAction implements Executable<msdyn_EvaluateConversationResponse> {
  constructor(
    public readonly criteriaId: string,
    public readonly extendedContext: string,
    public readonly conversationPayload: string,
    public readonly langLocale: string,
    public readonly evaluationId: string,
    public readonly allowCrossGeo: boolean,
    public readonly recordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EvaluateConversation`;

    const body: Record<string, unknown> = {
      CriteriaId: this.criteriaId,
      ExtendedContext: this.extendedContext,
      ConversationPayload: this.conversationPayload,
      LangLocale: this.langLocale,
      EvaluationId: this.evaluationId,
      AllowCrossGeo: this.allowCrossGeo,
      RecordId: this.recordId,
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

  async parseResponse(response: Response): Promise<msdyn_EvaluateConversationResponse> {
    const data = await response.json();
    return data as msdyn_EvaluateConversationResponse;
  }
}
