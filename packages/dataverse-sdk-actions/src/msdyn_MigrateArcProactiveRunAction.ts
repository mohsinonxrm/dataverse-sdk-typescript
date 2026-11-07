import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_MigrateArcProactiveRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MigrateArcProactiveRunResponse {
  "@odata.context"?: string;
  Exception: string;
  OutputString: string;
}

/**
 * msdyn_MigrateArcProactiveRun action
 *
 * Unbound action
 */
export class msdyn_MigrateArcProactiveRunAction implements Executable<msdyn_MigrateArcProactiveRunResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateArcProactiveRun`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MigrateArcProactiveRunResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_MigrateArcProactiveRunResponse;
  }
}
