import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAnswerFromDocuments action
 */
export interface msdyn_GetAnswerFromDocumentsResponse {
  msdyn_citations: string;
  msdyn_answerRaw: string;
  msdyn_answer: string;
}

/**
 * msdyn_GetAnswerFromDocuments action
 *
 * Unbound action
 */
export class msdyn_GetAnswerFromDocumentsAction implements Executable<msdyn_GetAnswerFromDocumentsResponse> {
  constructor(
    public readonly msdyn_activityId: string,
    public readonly msdyn_updatedUserQuery: string,
    public readonly msdyn_documentUrl: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnswerFromDocuments`;

    const body: Record<string, unknown> = {
      msdyn_activityId: this.msdyn_activityId,
      msdyn_updatedUserQuery: this.msdyn_updatedUserQuery,
      msdyn_documentUrl: this.msdyn_documentUrl,
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

  async parseResponse(response: Response): Promise<msdyn_GetAnswerFromDocumentsResponse> {
    const data = await response.json();
    return data as msdyn_GetAnswerFromDocumentsResponse;
  }
}
