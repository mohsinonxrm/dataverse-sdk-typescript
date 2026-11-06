import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_createtemplatecvrelationships action
 */
export interface msdyn_createtemplatecvrelationshipsResponse {
  status: boolean;
}

/**
 * Parameters of the msdyn_createtemplatecvrelationships action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_createtemplatecvrelationshipsActionParameters {
  msdyn_templaterulesetid: string;
}

/**
 * msdyn_createtemplatecvrelationships action
 *
 * Unbound action
 */
export class msdyn_createtemplatecvrelationshipsAction implements Executable<msdyn_createtemplatecvrelationshipsResponse> {
  constructor(public readonly parameters: msdyn_createtemplatecvrelationshipsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_createtemplatecvrelationships`;

    const body = requestBody({
      msdyn_templaterulesetid: this.parameters.msdyn_templaterulesetid,
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

  async parseResponse(response: Response): Promise<msdyn_createtemplatecvrelationshipsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_createtemplatecvrelationshipsResponse;
    return (await response.json()) as msdyn_createtemplatecvrelationshipsResponse;
  }
}
