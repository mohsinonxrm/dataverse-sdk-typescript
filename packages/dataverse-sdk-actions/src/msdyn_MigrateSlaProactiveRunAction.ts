import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MigrateSlaProactiveRun action
 */
export interface msdyn_MigrateSlaProactiveRunResponse {
  OutputString: string;
  Exception: string;
}

/**
 * msdyn_MigrateSlaProactiveRun action
 *
 * Unbound action
 */
export class msdyn_MigrateSlaProactiveRunAction implements Executable<msdyn_MigrateSlaProactiveRunResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSlaProactiveRun`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MigrateSlaProactiveRunResponse> {
    const data = await response.json();
    return data as msdyn_MigrateSlaProactiveRunResponse;
  }
}
