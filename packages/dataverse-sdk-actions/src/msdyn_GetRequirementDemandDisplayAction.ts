import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRequirementDemandDisplay action
 */
export interface msdyn_GetRequirementDemandDisplayResponse {
  RequirementDemandDisplay: string;
}

/**
 * msdyn_GetRequirementDemandDisplay action
 *
 * Unbound action
 */
export class msdyn_GetRequirementDemandDisplayAction implements Executable<msdyn_GetRequirementDemandDisplayResponse> {
  constructor(
    public readonly requirementIds: string,
    public readonly timescale: number,
    public readonly timeZoneCode: number,
    public readonly ignoreTimeZone: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDemandDisplay`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
      Timescale: this.timescale,
      TimeZoneCode: this.timeZoneCode,
      IgnoreTimeZone: this.ignoreTimeZone,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDemandDisplayResponse> {
    const data = await response.json();
    return data as msdyn_GetRequirementDemandDisplayResponse;
  }
}
