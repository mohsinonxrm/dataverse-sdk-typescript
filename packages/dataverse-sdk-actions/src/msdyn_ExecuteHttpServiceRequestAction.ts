import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExecuteHttpServiceRequest action
 */
export interface msdyn_ExecuteHttpServiceRequestResponse {
  msdyn_StatusCode: string;
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_ExecuteHttpServiceRequest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteHttpServiceRequestActionParameters {
  msdyn_RequestType: string;
  msdyn_RequestUrl: string;
  msdyn_CloudServiceApplicationType: number;
  msdyn_RequestBody?: string;
  msdyn_Method: string;
}

/**
 * msdyn_ExecuteHttpServiceRequest action
 *
 * Unbound action
 */
export class msdyn_ExecuteHttpServiceRequestAction implements Executable<msdyn_ExecuteHttpServiceRequestResponse> {
  constructor(public readonly parameters: msdyn_ExecuteHttpServiceRequestActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteHttpServiceRequest`;

    const body = requestBody({
      msdyn_RequestType: this.parameters.msdyn_RequestType,
      msdyn_RequestUrl: this.parameters.msdyn_RequestUrl,
      msdyn_CloudServiceApplicationType: this.parameters.msdyn_CloudServiceApplicationType,
      msdyn_RequestBody: this.parameters.msdyn_RequestBody,
      msdyn_Method: this.parameters.msdyn_Method,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteHttpServiceRequestResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ExecuteHttpServiceRequestResponse;
    return (await response.json()) as msdyn_ExecuteHttpServiceRequestResponse;
  }
}
