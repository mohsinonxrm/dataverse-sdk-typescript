import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ResolveTimezone action
 */
export interface msdyn_ResolveTimezoneResponse {
  TimezoneData: string;
}

/**
 * msdyn_ResolveTimezone action
 *
 * Unbound action
 */
export class msdyn_ResolveTimezoneAction implements Executable<msdyn_ResolveTimezoneResponse> {
  constructor(
    public readonly requirementIds: string,
    public readonly userId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveTimezone`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
      UserId: this.userId,
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

  async parseResponse(response: Response): Promise<msdyn_ResolveTimezoneResponse> {
    const data = await response.json();
    return data as msdyn_ResolveTimezoneResponse;
  }
}
