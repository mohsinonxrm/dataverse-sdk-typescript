import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetPrecannedQuestions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetPrecannedQuestionsResponse {
  "@odata.context"?: string;
  msdyn_csrescalationquestions: string;
  msdyn_errormessage: string;
  msdyn_selfservicequestions: string;
}

/**
 * Parameters of the msdyn_GetPrecannedQuestions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPrecannedQuestionsActionParameters {
  msdyn_industry?: string;
}

/**
 * msdyn_GetPrecannedQuestions action
 *
 * Unbound action
 */
export class msdyn_GetPrecannedQuestionsAction implements Executable<msdyn_GetPrecannedQuestionsResponse> {
  constructor(public readonly parameters: msdyn_GetPrecannedQuestionsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPrecannedQuestions`;

    const body = requestBody({
      msdyn_industry: this.parameters.msdyn_industry,
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

  async parseResponse(response: Response): Promise<msdyn_GetPrecannedQuestionsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetPrecannedQuestionsResponse;
  }
}
