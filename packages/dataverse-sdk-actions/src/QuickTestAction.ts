import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from QuickTest action
 */
export interface QuickTestResponse {
  response: string;
  overrideHttpStatusCode: string;
  overrideLocation: string;
  overrideRetryAfter: string;
}

/**
 * QuickTest action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 */
export class QuickTestAction implements Executable<QuickTestResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly version: string,
    public readonly request?: string,
    public readonly requestv2?: EntityReference | AnyEntityPayload,
    public readonly source?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.QuickTest`;

    const body: Record<string, unknown> = {
      version: this.version,
      request: this.request,
      requestv2: this.requestv2,
      source: this.source,
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

  async parseResponse(response: Response): Promise<QuickTestResponse> {
    const data = await response.json();
    return data as QuickTestResponse;
  }
}
