import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { CreateVirtualConnectorTableMetadata } from "./types/index.js";

/**
 * Response from CreateVirtualConnectorTable action
 */
export interface CreateVirtualConnectorTableResponse {
  EntityId: string;
}

/**
 * Parameters of the CreateVirtualConnectorTable action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateVirtualConnectorTableActionParameters {
  CreateVirtualConnectorTableMetadata?: CreateVirtualConnectorTableMetadata;
}

/**
 * CreateVirtualConnectorTable action
 *
 * Unbound action
 */
export class CreateVirtualConnectorTableAction implements Executable<CreateVirtualConnectorTableResponse> {
  constructor(public readonly parameters: CreateVirtualConnectorTableActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateVirtualConnectorTable`;

    const body = requestBody({
      CreateVirtualConnectorTableMetadata: this.parameters.CreateVirtualConnectorTableMetadata,
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

  async parseResponse(response: Response): Promise<CreateVirtualConnectorTableResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CreateVirtualConnectorTableResponse;
    return (await response.json()) as CreateVirtualConnectorTableResponse;
  }
}
