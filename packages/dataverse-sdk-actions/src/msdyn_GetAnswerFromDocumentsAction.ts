import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAnswerFromDocuments action
 */
export interface msdyn_GetAnswerFromDocumentsResponse {
  msdyn_citations: string;
  msdyn_answerRaw: string;
  msdyn_answer: string;
}

/**
 * Parameters of the msdyn_GetAnswerFromDocuments action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAnswerFromDocumentsActionParameters {
  msdyn_activityId?: string;
  msdyn_updatedUserQuery?: string;
  msdyn_documentUrl: string;
}

/**
 * msdyn_GetAnswerFromDocuments action
 *
 * Unbound action
 */
export class msdyn_GetAnswerFromDocumentsAction implements Executable<msdyn_GetAnswerFromDocumentsResponse> {
  constructor(public readonly parameters: msdyn_GetAnswerFromDocumentsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnswerFromDocuments`;

    const body = requestBody({
      msdyn_activityId: this.parameters.msdyn_activityId,
      msdyn_updatedUserQuery: this.parameters.msdyn_updatedUserQuery,
      msdyn_documentUrl: this.parameters.msdyn_documentUrl,
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

  async parseResponse(response: Response): Promise<msdyn_GetAnswerFromDocumentsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAnswerFromDocumentsResponse;
    return (await response.json()) as msdyn_GetAnswerFromDocumentsResponse;
  }
}
