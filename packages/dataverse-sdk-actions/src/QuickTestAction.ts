import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from QuickTest action
 */
export interface QuickTestResponse {
  overrideHttpStatusCode: string;
  overrideLocation: string;
  overrideRetryAfter: string;
  response: string;
}

/**
 * Parameters of the QuickTest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QuickTestActionParameters {
  version: string;
  request?: string;
  requestv2?: EntityReference | AnyEntityPayload;
  source?: string;
}

/**
 * QuickTest action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class QuickTestAction implements Executable<QuickTestResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly parameters: QuickTestActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.QuickTest`;

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

  async parseResponse(response: Response): Promise<QuickTestResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as QuickTestResponse;
    return (await response.json()) as QuickTestResponse;
  }
}
