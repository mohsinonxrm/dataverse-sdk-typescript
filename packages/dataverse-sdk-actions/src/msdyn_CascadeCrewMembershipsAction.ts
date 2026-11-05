import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CascadeCrewMemberships action
 */
export interface msdyn_CascadeCrewMembershipsResponse {
  AsyncOperationRequestId: string;
}

/**
 * msdyn_CascadeCrewMemberships action
 *
 * Unbound action
 */
export class msdyn_CascadeCrewMembershipsAction implements Executable<msdyn_CascadeCrewMembershipsResponse> {
  constructor(public readonly payload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeCrewMemberships`;

    const body: Record<string, unknown> = {
      Payload: this.payload,
    };

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
    const data = await response.json();
    return data as msdyn_CascadeCrewMembershipsResponse;
  }
}
