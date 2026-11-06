import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SetupAiConnection action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface SetupAiConnectionResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as SetupAiConnectionResponse;
  }
}
