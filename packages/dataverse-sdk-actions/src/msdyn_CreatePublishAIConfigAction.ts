import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ocsimltraining } from "./types/index.js";

/**
 * Response from msdyn_CreatePublishAIConfig action
 */
export interface msdyn_CreatePublishAIConfigResponse {
  isUnpublish: string;
}

/**
 * Parameters of the msdyn_CreatePublishAIConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreatePublishAIConfigActionParameters {
  ocsimltraining: EntityReference | EntityPayload<msdyn_ocsimltraining>;
}

/**
 * msdyn_CreatePublishAIConfig action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocskillidentmlmodel)
 *
 * The first argument is the id of the msdyn_ocskillidentmlmodel record to call it on.
 */
export class msdyn_CreatePublishAIConfigAction implements Executable<msdyn_CreatePublishAIConfigResponse> {
  constructor(
    public readonly msdyn_ocskillidentmlmodelId: string,
    public readonly parameters: msdyn_CreatePublishAIConfigActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreatePublishAIConfig`;

    const body = requestBody({
      ocsimltraining: this.parameters.ocsimltraining,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreatePublishAIConfigResponse;
    return (await response.json()) as msdyn_CreatePublishAIConfigResponse;
  }
}
