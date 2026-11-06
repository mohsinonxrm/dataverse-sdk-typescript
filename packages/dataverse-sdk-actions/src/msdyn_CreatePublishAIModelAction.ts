import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ocsimltraining } from "./types/index.js";

/**
 * Response from the msdyn_CreatePublishAIModel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreatePublishAIModelResponse {
  "@odata.context"?: string;
  Response: string;
}

/**
 * Parameters of the msdyn_CreatePublishAIModel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreatePublishAIModelActionParameters {
  ocsimltraining: EntityReference | EntityPayload<msdyn_ocsimltraining>;
}

/**
 * msdyn_CreatePublishAIModel action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocskillidentmlmodel)
 *
 * The first argument is the id of the msdyn_ocskillidentmlmodel record to call it on.
 */
export class msdyn_CreatePublishAIModelAction implements Executable<msdyn_CreatePublishAIModelResponse> {
  constructor(
    public readonly msdyn_ocskillidentmlmodelId: string,
    public readonly parameters: msdyn_CreatePublishAIModelActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreatePublishAIModel`;

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

  async parseResponse(response: Response): Promise<msdyn_CreatePublishAIModelResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreatePublishAIModelResponse;
  }
}
