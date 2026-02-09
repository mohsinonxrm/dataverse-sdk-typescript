import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { CreateVirtualConnectorTableMetadata } from "./types/index.js";

/**
 * CreateVirtualConnectorTable request message
 *
 * Web API Action: CreateVirtualConnectorTable
 */
export class CreateVirtualConnectorTableRequest
  extends OrganizationRequest
  implements Executable<CreateVirtualConnectorTableResponse>
{
  constructor(public createVirtualConnectorTableMetadata: CreateVirtualConnectorTableMetadata) {
    super("CreateVirtualConnectorTable");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateVirtualConnectorTable`;

    const body: Record<string, unknown> = {
      CreateVirtualConnectorTableMetadata: this.createVirtualConnectorTableMetadata,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateVirtualConnectorTableResponse> {
    const data = await response.json();
    return CreateVirtualConnectorTableResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CreateVirtualConnectorTableMetadata: this.createVirtualConnectorTableMetadata,
    };
  }
}

/**
 * CreateVirtualConnectorTable response message
 */
export class CreateVirtualConnectorTableResponse extends OrganizationResponse {
  constructor(public result: CreateVirtualConnectorTableResponse) {
    super("CreateVirtualConnectorTable");
  }

  static fromResponse(data: unknown): CreateVirtualConnectorTableResponse {
    return new CreateVirtualConnectorTableResponse((data as any).value);
  }
}
