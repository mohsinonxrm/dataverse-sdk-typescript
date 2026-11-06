import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_dataprovideroperations action
 */
export interface msdyn_dataprovideroperationsResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_dataprovideroperations action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_dataprovideroperationsActionParameters {
  msdyn_recordid?: string;
  msdyn_payload?: string;
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
      msdyn_recordid: this.parameters.msdyn_recordid,
      msdyn_payload: this.parameters.msdyn_payload,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_dataprovideroperationsResponse;
    return (await response.json()) as msdyn_dataprovideroperationsResponse;
  }
}
