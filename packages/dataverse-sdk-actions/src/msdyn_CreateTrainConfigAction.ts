import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_ocsimltraining } from "./types/index.js";

/**
 * Response from msdyn_CreateTrainConfig action
 */
export interface msdyn_CreateTrainConfigResponse {
  value: msdyn_ocsimltraining;
}

/**
 * msdyn_CreateTrainConfig action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocskillidentmlmodel)
 */
export class msdyn_CreateTrainConfigAction implements Executable<msdyn_CreateTrainConfigResponse> {
  constructor(public readonly msdyn_ocskillidentmlmodelId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreateTrainConfig`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateTrainConfigResponse> {
    const data = await response.json();
    return data as msdyn_CreateTrainConfigResponse;
  }
}
