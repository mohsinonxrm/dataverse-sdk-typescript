import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ParseKBResult action
 */
export interface msdyn_ParseKBResultResponse {
  ParseKBExternalSourceResultResponse: string;
}

/**
 * Parameters of the msdyn_ParseKBResult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ParseKBResultActionParameters {
  DoesKBExistInExternalResult: string;
  ExternalSourceKBSearchResult: string;
}

/**
 * msdyn_ParseKBResult action
 *
 * Unbound action
 */
export class msdyn_ParseKBResultAction implements Executable<msdyn_ParseKBResultResponse> {
  constructor(public readonly parameters: msdyn_ParseKBResultActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ParseKBResult`;

    const body = requestBody({
      DoesKBExistInExternalResult: this.parameters.DoesKBExistInExternalResult,
      ExternalSourceKBSearchResult: this.parameters.ExternalSourceKBSearchResult,
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

  async parseResponse(response: Response): Promise<msdyn_ParseKBResultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ParseKBResultResponse;
    return (await response.json()) as msdyn_ParseKBResultResponse;
  }
}
