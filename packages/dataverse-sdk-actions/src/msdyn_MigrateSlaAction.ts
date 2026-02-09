import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MigrateSla action
 */
export interface msdyn_MigrateSlaResponse {
  OutputString: string;
  Exception: string;
}

/**
 * msdyn_MigrateSla action
 *
 * Unbound action
 */
export class msdyn_MigrateSlaAction implements Executable<msdyn_MigrateSlaResponse> {
  constructor(public readonly slaMigrationRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSla`;

    const body: Record<string, unknown> = {
      SlaMigrationRequest: this.slaMigrationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateSlaResponse> {
    const data = await response.json();
    return data as msdyn_MigrateSlaResponse;
  }
}
