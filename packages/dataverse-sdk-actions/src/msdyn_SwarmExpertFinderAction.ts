import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SwarmExpertFinder action
 */
export interface msdyn_SwarmExpertFinderResponse {
  // No content returned
}

/**
 * msdyn_SwarmExpertFinder action
 *
 * Unbound action
 */
export class msdyn_SwarmExpertFinderAction implements Executable<msdyn_SwarmExpertFinderResponse> {
  constructor(
    public readonly skillList: Record<string, unknown>[],
    public readonly swarmId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SwarmExpertFinder`;

    const body: Record<string, unknown> = {
      SkillList: this.skillList,
      SwarmId: this.swarmId,
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

  async parseResponse(response: Response): Promise<msdyn_SwarmExpertFinderResponse> {
    // No return value (204 No Content)
    return {};
  }
}
