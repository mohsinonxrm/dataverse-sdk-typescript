import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_MigrateSlaProactiveRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MigrateSlaProactiveRunResponse {
  "@odata.context"?: string;
  Exception: string;
  OutputString: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_MigrateSlaProactiveRunResponse;
  }
}
