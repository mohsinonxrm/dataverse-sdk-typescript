import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from Predict action
 */
export interface PredictResponse {
  overrideHttpStatusCode: string;
  overrideLocation: string;
  overrideRetryAfter: string;
  response: string;
}

/**
 * Parameters of the Predict action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PredictActionParameters {
  version: string;
  request?: string;
  requestv2?: EntityReference | AnyEntityPayload;
  source?: string;
}

/**
 * Predict action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class PredictAction implements Executable<PredictResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly parameters: PredictActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.Predict`;

    const body = requestBody({
      version: this.parameters.version,
      request: this.parameters.request,
      requestv2: this.parameters.requestv2,
      source: this.parameters.source,
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

  async parseResponse(response: Response): Promise<PredictResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PredictResponse;
    return (await response.json()) as PredictResponse;
  }
}
