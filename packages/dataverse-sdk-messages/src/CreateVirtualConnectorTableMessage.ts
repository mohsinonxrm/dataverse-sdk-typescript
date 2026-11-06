import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type {
  CreateVirtualConnectorTableMetadata,
  CreateVirtualConnectorTableResponse as CreateVirtualConnectorTableResponseData,
} from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CreateVirtualConnectorTableResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CreateVirtualConnectorTable response message
 */
export class CreateVirtualConnectorTableResponse extends OrganizationResponse {
  constructor(public result: CreateVirtualConnectorTableResponseData) {
    super("CreateVirtualConnectorTable");
  }

  static fromResponse(data: unknown): CreateVirtualConnectorTableResponse {
    return new CreateVirtualConnectorTableResponse(
      responseObject<CreateVirtualConnectorTableResponseData>(data)
    );
  }
}
