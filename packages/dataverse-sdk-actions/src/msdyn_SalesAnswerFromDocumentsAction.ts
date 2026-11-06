import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAnswerFromDocuments action
 */
export interface msdyn_SalesAnswerFromDocumentsResponse {
  msdyn_sales_copilot_output: string;
}

/**
 * Parameters of the msdyn_SalesAnswerFromDocuments action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAnswerFromDocumentsActionParameters {
  msdyn_queryLocale?: string;
  msdyn_responseFormat?: string;
  msdyn_userQuery: string;
  msdyn_additionalParameters?: string;
  msdyn_activityId?: string;
}

/**
 * msdyn_SalesAnswerFromDocuments action
 *
 * Unbound action
 */
export class msdyn_SalesAnswerFromDocumentsAction implements Executable<msdyn_SalesAnswerFromDocumentsResponse> {
  constructor(public readonly parameters: msdyn_SalesAnswerFromDocumentsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAnswerFromDocuments`;

    const body = requestBody({
      msdyn_queryLocale: this.parameters.msdyn_queryLocale,
      msdyn_responseFormat: this.parameters.msdyn_responseFormat,
      msdyn_userQuery: this.parameters.msdyn_userQuery,
      msdyn_additionalParameters: this.parameters.msdyn_additionalParameters,
      msdyn_activityId: this.parameters.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAnswerFromDocumentsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAnswerFromDocumentsResponse;
    return (await response.json()) as msdyn_SalesAnswerFromDocumentsResponse;
  }
}
