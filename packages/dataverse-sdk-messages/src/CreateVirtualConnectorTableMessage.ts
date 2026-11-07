import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { CreateVirtualConnectorTableMetadata } from "./types/index.js";

/**
 * Parameters of the CreateVirtualConnectorTable message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateVirtualConnectorTableRequestParameters {
  CreateVirtualConnectorTableMetadata?: CreateVirtualConnectorTableMetadata;
}

/**
 * CreateVirtualConnectorTable request message
 *
 * Web API Action: CreateVirtualConnectorTable
 */
export class CreateVirtualConnectorTableRequest
  extends OrganizationRequest
  implements Executable<CreateVirtualConnectorTableResponse>
{
  declare readonly Parameters: Readonly<CreateVirtualConnectorTableRequestParameters>;

  constructor(parameters: CreateVirtualConnectorTableRequestParameters = {}) {
    super("CreateVirtualConnectorTable", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateVirtualConnectorTable`;

    const body = requestBody({
      CreateVirtualConnectorTableMetadata: this.Parameters.CreateVirtualConnectorTableMetadata,
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
    return CreateVirtualConnectorTableResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateVirtualConnectorTable action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateVirtualConnectorTableResult {
  "@odata.context"?: string;
  EntityId: string;
}

/**
 * CreateVirtualConnectorTable response message
 *
 * `result` is the value the CreateVirtualConnectorTable action returns (see {@link CreateVirtualConnectorTableResult}).
 */
export class CreateVirtualConnectorTableResponse extends OrganizationResponse {
  constructor(public result: CreateVirtualConnectorTableResult) {
    super("CreateVirtualConnectorTable");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateVirtualConnectorTableResponse {
    return new CreateVirtualConnectorTableResponse(data as CreateVirtualConnectorTableResult);
  }
}
