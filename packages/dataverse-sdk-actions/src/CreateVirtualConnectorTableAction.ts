import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { CreateVirtualConnectorTableMetadata } from "./types/index.js";

/**
 * Response from the CreateVirtualConnectorTable action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateVirtualConnectorTableResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CreateVirtualConnectorTableResponse;
  }
}
