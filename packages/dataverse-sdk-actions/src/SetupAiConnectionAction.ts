import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from SetupAiConnection action
 */
export interface SetupAiConnectionResponse {
  value: EntityReference;
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
