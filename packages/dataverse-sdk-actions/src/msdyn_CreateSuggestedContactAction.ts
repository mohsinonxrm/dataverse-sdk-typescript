import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateSuggestedContact action
 */
export interface msdyn_CreateSuggestedContactResponse {
  id: string;
  failedRecordCount: string;
}

/**
 * Parameters of the msdyn_CreateSuggestedContact action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSuggestedContactActionParameters {
  SuggestedContactId: string;
}

/**
 * msdyn_CreateSuggestedContact action
 *
 * Unbound action
 */
export class msdyn_CreateSuggestedContactAction implements Executable<msdyn_CreateSuggestedContactResponse> {
  constructor(public readonly parameters: msdyn_CreateSuggestedContactActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedContact`;

    const body = requestBody({
      SuggestedContactId: this.parameters.SuggestedContactId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedContactResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateSuggestedContactResponse;
  }
}
