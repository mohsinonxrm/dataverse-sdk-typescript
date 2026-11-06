import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemform } from "./types/index.js";

/**
 * Response from CopySystemForm action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CopySystemFormResponse extends systemform {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * CopySystemForm action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemform)
 */
export class CopySystemFormAction implements Executable<CopySystemFormResponse> {
  constructor(
    public readonly systemformId: string,
    public readonly target?: EntityReference | EntityPayload<systemform>
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemforms(${this.systemformId})/Microsoft.Dynamics.CRM.CopySystemForm`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<CopySystemFormResponse> {
    const data = await response.json();
    return data as CopySystemFormResponse;
  }
}
