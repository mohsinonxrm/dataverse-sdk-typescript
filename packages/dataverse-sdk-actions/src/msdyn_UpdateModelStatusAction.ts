import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateModelStatus action
 */
export interface msdyn_UpdateModelStatusResponse {
  // No content returned
}

/**
 * msdyn_UpdateModelStatus action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocsimltraining)
 */
export class msdyn_UpdateModelStatusAction implements Executable<msdyn_UpdateModelStatusResponse> {
  constructor(
    public readonly msdyn_ocsimltrainingId: string,
    public readonly aIConfig: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsimltrainings(${this.msdyn_ocsimltrainingId})/Microsoft.Dynamics.CRM.msdyn_UpdateModelStatus`;

    const body: Record<string, unknown> = {
      AIConfig: this.aIConfig,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateModelStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
