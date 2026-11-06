import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_fetchemailsentimentsapi action
 */
export interface msdyn_fetchemailsentimentsapiResponse {
  emailsentimentsapijson: string;
}

/**
 * Parameters of the msdyn_fetchemailsentimentsapi action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchemailsentimentsapiActionParameters {
  entityid?: string;
  entitylogicalname?: string;
}

/**
 * msdyn_fetchemailsentimentsapi action
 *
 * Unbound action
 */
export class msdyn_fetchemailsentimentsapiAction implements Executable<msdyn_fetchemailsentimentsapiResponse> {
  constructor(public readonly parameters: msdyn_fetchemailsentimentsapiActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchemailsentimentsapi`;

    const body = requestBody({
      entityid: this.parameters.entityid,
      entitylogicalname: this.parameters.entitylogicalname,
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

  async parseResponse(response: Response): Promise<msdyn_fetchemailsentimentsapiResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_fetchemailsentimentsapiResponse;
    return (await response.json()) as msdyn_fetchemailsentimentsapiResponse;
  }
}
