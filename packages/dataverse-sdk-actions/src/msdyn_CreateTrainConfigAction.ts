import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_ocsimltraining } from "./types/index.js";

/**
 * Response from msdyn_CreateTrainConfig action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_CreateTrainConfigResponse extends msdyn_ocsimltraining {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * msdyn_CreateTrainConfig action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocskillidentmlmodel)
 *
 * The first argument is the id of the msdyn_ocskillidentmlmodel record to call it on.
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateTrainConfigResponse;
  }
}
