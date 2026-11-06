import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSankeyData action
 */
export interface msdyn_GetSankeyDataResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_GetSankeyData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSankeyDataActionParameters {
  msdyn_sequenceid: string;
  msdyn_datefrom: string;
  msdyn_dateto: string;
}

/**
 * msdyn_GetSankeyData action
 *
 * Unbound action
 */
export class msdyn_GetSankeyDataAction implements Executable<msdyn_GetSankeyDataResponse> {
  constructor(public readonly parameters: msdyn_GetSankeyDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyData`;

    const body = requestBody({
      msdyn_sequenceid: this.parameters.msdyn_sequenceid,
      msdyn_datefrom: this.parameters.msdyn_datefrom,
      msdyn_dateto: this.parameters.msdyn_dateto,
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

  async parseResponse(response: Response): Promise<msdyn_GetSankeyDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetSankeyDataResponse;
    return (await response.json()) as msdyn_GetSankeyDataResponse;
  }
}
