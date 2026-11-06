import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExecuteSISampleDataRequest action
 */
export interface msdyn_ExecuteSISampleDataRequestResponse {
  Response: string;
}

/**
 * Parameters of the msdyn_ExecuteSISampleDataRequest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteSISampleDataRequestActionParameters {
  Operation: string;
  Version?: string;
  Lcid?: string;
}

/**
 * msdyn_ExecuteSISampleDataRequest action
 *
 * Unbound action
 */
export class msdyn_ExecuteSISampleDataRequestAction implements Executable<msdyn_ExecuteSISampleDataRequestResponse> {
  constructor(public readonly parameters: msdyn_ExecuteSISampleDataRequestActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSISampleDataRequest`;

    const body = requestBody({
      Operation: this.parameters.Operation,
      Version: this.parameters.Version,
      Lcid: this.parameters.Lcid,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSISampleDataRequestResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ExecuteSISampleDataRequestResponse;
    return (await response.json()) as msdyn_ExecuteSISampleDataRequestResponse;
  }
}
