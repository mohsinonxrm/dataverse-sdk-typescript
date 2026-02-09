import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CleanupDiagnosticsWrappers action
 */
export interface msdyn_CleanupDiagnosticsWrappersResponse {
  // No content returned
}

/**
 * msdyn_CleanupDiagnosticsWrappers action
 *
 * Unbound action
 */
export class msdyn_CleanupDiagnosticsWrappersAction implements Executable<msdyn_CleanupDiagnosticsWrappersResponse> {
  constructor(
    public readonly workItemId: string,
    public readonly targetId: string,
    public readonly runNumber: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanupDiagnosticsWrappers`;

    const body: Record<string, unknown> = {
      WorkItemId: this.workItemId,
      TargetId: this.targetId,
      RunNumber: this.runNumber,
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

  async parseResponse(response: Response): Promise<msdyn_CleanupDiagnosticsWrappersResponse> {
    // No return value (204 No Content)
    return {};
  }
}
