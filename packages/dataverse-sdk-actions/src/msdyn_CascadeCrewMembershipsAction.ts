import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CascadeCrewMemberships action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CascadeCrewMembershipsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CascadeCrewMembershipsResponse;
  }
}
