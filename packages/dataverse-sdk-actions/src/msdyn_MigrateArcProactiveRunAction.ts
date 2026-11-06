import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MigrateArcProactiveRun action
 */
export interface msdyn_MigrateArcProactiveRunResponse {
  OutputString: string;
  Exception: string;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_MigrateArcProactiveRunResponse;
    return (await response.json()) as msdyn_MigrateArcProactiveRunResponse;
  }
}
