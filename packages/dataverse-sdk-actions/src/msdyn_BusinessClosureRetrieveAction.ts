import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_businessclosure } from "./types/index.js";

/**
 * Response from msdyn_BusinessClosureRetrieve action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_BusinessClosureRetrieveResponse extends msdyn_businessclosure {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the msdyn_BusinessClosureRetrieve action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BusinessClosureRetrieveActionParameters {
  Id: string;
}

/**
 * msdyn_BusinessClosureRetrieve action
 *
 * Unbound action
 */
export class msdyn_BusinessClosureRetrieveAction implements Executable<msdyn_BusinessClosureRetrieveResponse> {
  constructor(public readonly parameters: msdyn_BusinessClosureRetrieveActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureRetrieve`;

    const body = requestBody({
      Id: this.parameters.Id,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureRetrieveResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_BusinessClosureRetrieveResponse;
  }
}
