import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveSearchProviders action
 */
export interface msdyn_RetrieveSearchProvidersResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_RetrieveSearchProviders action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveSearchProvidersActionParameters {
  ApplicationId?: string;
}

/**
 * msdyn_RetrieveSearchProviders action
 *
 * Unbound action
 */
export class msdyn_RetrieveSearchProvidersAction implements Executable<msdyn_RetrieveSearchProvidersResponse> {
  constructor(public readonly parameters: msdyn_RetrieveSearchProvidersActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveSearchProviders`;

    const body = requestBody({
      ApplicationId: this.parameters.ApplicationId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveSearchProvidersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveSearchProvidersResponse;
  }
}
