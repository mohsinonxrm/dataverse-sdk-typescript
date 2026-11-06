import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { CreateVirtualConnectorTableMetadata } from "./types/index.js";

/**
 * Response from CreateVirtualConnectorTable action
 */
export interface CreateVirtualConnectorTableResponse {
  EntityId: string;
}

/**
 * CreateVirtualConnectorTable action
 *
 * Unbound action
 */
export class CreateVirtualConnectorTableAction implements Executable<CreateVirtualConnectorTableResponse> {
  constructor(
    public readonly createVirtualConnectorTableMetadata?: CreateVirtualConnectorTableMetadata
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateVirtualConnectorTable`;

    const body: Record<string, unknown> = {
      CreateVirtualConnectorTableMetadata: this.createVirtualConnectorTableMetadata,
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

  async parseResponse(response: Response): Promise<CreateVirtualConnectorTableResponse> {
    const data = await response.json();
    return data as CreateVirtualConnectorTableResponse;
  }
}
