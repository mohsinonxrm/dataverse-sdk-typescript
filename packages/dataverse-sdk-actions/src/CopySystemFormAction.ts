import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
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
 * Parameters of the CopySystemForm action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CopySystemFormActionParameters {
  Target?: EntityReference | EntityPayload<systemform>;
}

/**
 * CopySystemForm action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemform)
 *
 * The first argument is the id of the systemform record to call it on.
 */
export class CopySystemFormAction implements Executable<CopySystemFormResponse> {
  constructor(
    public readonly systemformId: string,
    public readonly parameters: CopySystemFormActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemforms(${this.systemformId})/Microsoft.Dynamics.CRM.CopySystemForm`;

    const body = requestBody({
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<CopySystemFormResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CopySystemFormResponse;
  }
}
