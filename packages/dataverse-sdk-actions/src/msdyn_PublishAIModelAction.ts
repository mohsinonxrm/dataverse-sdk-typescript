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
 *
 * The first argument is the id of the msdyn_ocsimltraining record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_PublishAIModelResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_PublishAIModelResponse;
  }
}
