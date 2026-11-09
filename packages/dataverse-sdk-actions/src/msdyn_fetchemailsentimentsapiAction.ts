import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_fetchemailsentimentsapi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_fetchemailsentimentsapiResponse {
  "@odata.context"?: string;
  emailsentimentsapijson: string;
}

/**
 * Parameters of the msdyn_fetchemailsentimentsapi action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchemailsentimentsapiActionParameters {
  entitylogicalname?: string;
  entityid?: string;
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
      entitylogicalname: this.parameters.entitylogicalname,
      entityid: this.parameters.entityid,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_fetchemailsentimentsapiResponse;
  }
}
