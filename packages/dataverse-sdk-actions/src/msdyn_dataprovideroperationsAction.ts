import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_dataprovideroperations action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_dataprovideroperationsResponse {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_dataprovideroperations action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_dataprovideroperationsActionParameters {
  msdyn_payload?: string;
  msdyn_recordid?: string;
  msdyn_httpmethod: string;
}

/**
 * msdyn_dataprovideroperations action
 *
 * Unbound action
 */
export class msdyn_dataprovideroperationsAction implements Executable<msdyn_dataprovideroperationsResponse> {
  constructor(public readonly parameters: msdyn_dataprovideroperationsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_dataprovideroperations`;

    const body = requestBody({
      msdyn_payload: this.parameters.msdyn_payload,
      msdyn_recordid: this.parameters.msdyn_recordid,
      msdyn_httpmethod: this.parameters.msdyn_httpmethod,
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

  async parseResponse(response: Response): Promise<msdyn_dataprovideroperationsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_dataprovideroperationsResponse;
  }
}
