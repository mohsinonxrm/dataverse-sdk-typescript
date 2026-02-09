import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PublishAIModel action
 */
export interface msdyn_PublishAIModelResponse {
  // No content returned
}

/**
 * msdyn_PublishAIModel action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocsimltraining)
 */
export class msdyn_PublishAIModelAction implements Executable<msdyn_PublishAIModelResponse> {
  constructor(public readonly msdyn_ocsimltrainingId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsimltrainings(${this.msdyn_ocsimltrainingId})/Microsoft.Dynamics.CRM.msdyn_PublishAIModel`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_PublishAIModelResponse> {
    // No return value (204 No Content)
    return {};
  }
}
