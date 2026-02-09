import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetBookingDetailsByRequirementIds action
 */
export interface msdyn_GetBookingDetailsByRequirementIdsResponse {
  RequirementsBookingDetails: string;
}

/**
 * msdyn_GetBookingDetailsByRequirementIds action
 *
 * Unbound action
 */
export class msdyn_GetBookingDetailsByRequirementIdsAction implements Executable<msdyn_GetBookingDetailsByRequirementIdsResponse> {
  constructor(
    public readonly requirementIds: string,
    public readonly timescale: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookingDetailsByRequirementIds`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
      Timescale: this.timescale,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetBookingDetailsByRequirementIdsResponse> {
    const data = await response.json();
    return data as msdyn_GetBookingDetailsByRequirementIdsResponse;
  }
}
