import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * SetupAiConnection action
 *
 * Unbound action
 */
export class SetupAiConnectionAction implements Executable<SetupAiConnectionResponse> {
  constructor(
    public readonly connectorName: string,
    public readonly connectionName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetupAiConnection`;

    const body: Record<string, unknown> = {
      connectorName: this.connectorName,
      connectionName: this.connectionName,
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

  async parseResponse(response: Response): Promise<SetupAiConnectionResponse> {
    const data = await response.json();
    return data as SetupAiConnectionResponse;
  }
}
