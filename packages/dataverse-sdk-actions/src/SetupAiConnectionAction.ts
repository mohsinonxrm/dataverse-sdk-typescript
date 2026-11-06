import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SetupAiConnection action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type SetupAiConnectionResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the SetupAiConnection action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetupAiConnectionActionParameters {
  connectorName: string;
  connectionName: string;
}

/**
 * SetupAiConnection action
 *
 * Unbound action
 */
export class SetupAiConnectionAction implements Executable<SetupAiConnectionResponse> {
  constructor(public readonly parameters: SetupAiConnectionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetupAiConnection`;

    const body = requestBody({
      connectorName: this.parameters.connectorName,
      connectionName: this.parameters.connectionName,
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

  async parseResponse(response: Response): Promise<SetupAiConnectionResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as SetupAiConnectionResponse;
  }
}
