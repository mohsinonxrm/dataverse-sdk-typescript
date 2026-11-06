import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_updatesequencetargetstepdata action
 */
export interface msdyn_updatesequencetargetstepdataResponse {
  // No content returned
}

/**
 * msdyn_updatesequencetargetstepdata action
 *
 * Unbound action
 */
export class msdyn_updatesequencetargetstepdataAction implements Executable<msdyn_updatesequencetargetstepdataResponse> {
  constructor(
    public readonly msdyn_sequencetargetstepid: string,
    public readonly msdyn_linkedactivityid?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updatesequencetargetstepdata`;

    const body: Record<string, unknown> = {
      msdyn_sequencetargetstepid: this.msdyn_sequencetargetstepid,
      msdyn_linkedactivityid: this.msdyn_linkedactivityid,
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

  async parseResponse(response: Response): Promise<msdyn_updatesequencetargetstepdataResponse> {
    // No return value (204 No Content)
    return {};
  }
}
