import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_ocsimltraining } from "./types/index.js";

/**
 * Response from msdyn_CreatePublishAIModel action
 */
export interface msdyn_CreatePublishAIModelResponse {
  Response: string;
}

/**
 * msdyn_CreatePublishAIModel action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocskillidentmlmodel)
 */
export class msdyn_CreatePublishAIModelAction implements Executable<msdyn_CreatePublishAIModelResponse> {
  constructor(
    public readonly msdyn_ocskillidentmlmodelId: string,
    public readonly ocsimltraining: msdyn_ocsimltraining
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreatePublishAIModel`;

    const body: Record<string, unknown> = {
      ocsimltraining: this.ocsimltraining,
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

  async parseResponse(response: Response): Promise<msdyn_CreatePublishAIModelResponse> {
    const data = await response.json();
    return data as msdyn_CreatePublishAIModelResponse;
  }
}
