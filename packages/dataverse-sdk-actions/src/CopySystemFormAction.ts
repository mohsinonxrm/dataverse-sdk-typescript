import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemform } from "./types/index.js";

/**
 * Response from the CopySystemForm action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CopySystemFormResponse =
  | (systemform & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

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
    const url = `${baseUrl}/systemforms(${odataLiteral.guid(this.systemformId)})/Microsoft.Dynamics.CRM.CopySystemForm`;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as CopySystemFormResponse;
  }
}
