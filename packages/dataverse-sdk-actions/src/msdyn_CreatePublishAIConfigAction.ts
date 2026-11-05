import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_ocsimltraining } from "./types/index.js";

/**
 * Response from msdyn_CreatePublishAIConfig action
 */
export interface msdyn_CreatePublishAIConfigResponse {
  isUnpublish: string;
}

/**
 * msdyn_CreatePublishAIConfig action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocskillidentmlmodel)
 */
export class msdyn_CreatePublishAIConfigAction implements Executable<msdyn_CreatePublishAIConfigResponse> {
  constructor(
    public readonly msdyn_ocskillidentmlmodelId: string,
    public readonly ocsimltraining: msdyn_ocsimltraining
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreatePublishAIConfig`;

    const body: Record<string, unknown> = {
      ocsimltraining: this.ocsimltraining,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreatePublishAIConfigResponse> {
    const data = await response.json();
    return data as msdyn_CreatePublishAIConfigResponse;
  }
}
