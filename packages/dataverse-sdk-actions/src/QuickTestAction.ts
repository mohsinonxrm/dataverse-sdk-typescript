import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the QuickTest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface QuickTestResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/msdyn_aiconfigurations(${odataLiteral.guid(this.msdyn_aiconfigurationId)})/Microsoft.Dynamics.CRM.QuickTest`;

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as QuickTestResponse;
  }
}
