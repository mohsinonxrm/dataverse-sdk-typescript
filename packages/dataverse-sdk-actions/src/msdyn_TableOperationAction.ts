import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TableOperation action
 */
export interface msdyn_TableOperationResponse {
  Result: string;
}

/**
 * msdyn_TableOperation action
 *
 * Unbound action
 */
export class msdyn_TableOperationAction implements Executable<msdyn_TableOperationResponse> {
  constructor(
    public readonly entityNames: string,
    public readonly scenario: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TableOperation`;

    const body: Record<string, unknown> = {
      EntityNames: this.entityNames,
      Scenario: this.scenario,
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

  async parseResponse(response: Response): Promise<msdyn_TableOperationResponse> {
    const data = await response.json();
    return data as msdyn_TableOperationResponse;
  }
}
