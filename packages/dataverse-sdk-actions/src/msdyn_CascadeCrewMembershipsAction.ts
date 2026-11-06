import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CascadeCrewMemberships action
 */
export interface msdyn_CascadeCrewMembershipsResponse {
  AsyncOperationRequestId: string;
}

/**
 * Parameters of the msdyn_CascadeCrewMemberships action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CascadeCrewMembershipsActionParameters {
  Payload: string;
}

/**
 * msdyn_CascadeCrewMemberships action
 *
 * Unbound action
 */
export class msdyn_CascadeCrewMembershipsAction implements Executable<msdyn_CascadeCrewMembershipsResponse> {
  constructor(public readonly parameters: msdyn_CascadeCrewMembershipsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeCrewMemberships`;

    const body = requestBody({
      Payload: this.parameters.Payload,
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

  async parseResponse(response: Response): Promise<msdyn_CascadeCrewMembershipsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CascadeCrewMembershipsResponse;
    return (await response.json()) as msdyn_CascadeCrewMembershipsResponse;
  }
}
