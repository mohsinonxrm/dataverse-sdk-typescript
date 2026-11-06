import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { McpUpdateTableResponse as McpUpdateTableResponseData } from "./types/index.js";

/**
 * Parameters of the McpUpdateTable message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpUpdateTableRequestParameters {
  newDisplayName?: string;
  tablename: string;
  item: string;
  description?: string;
}

/**
 * McpUpdateTable request message
 *
 * Web API Action: McpUpdateTable
 */
export class McpUpdateTableRequest
  extends OrganizationRequest
  implements Executable<McpUpdateTableResponse>
{
  declare readonly Parameters: Readonly<McpUpdateTableRequestParameters>;

  constructor(parameters: McpUpdateTableRequestParameters) {
    super("McpUpdateTable", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpUpdateTable`;

    const body = requestBody({
      newDisplayName: this.Parameters.newDisplayName,
      tablename: this.Parameters.tablename,
      item: this.Parameters.item,
      description: this.Parameters.description,
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

  async parseResponse(response: Response): Promise<McpUpdateTableResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return McpUpdateTableResponse.fromResponse({});
    return McpUpdateTableResponse.fromResponse(await response.json());
  }
}

/**
 * McpUpdateTable response message
 */
export class McpUpdateTableResponse extends OrganizationResponse {
  constructor(public result: McpUpdateTableResponseData) {
    super("McpUpdateTable");
  }

  static fromResponse(data: unknown): McpUpdateTableResponse {
    return new McpUpdateTableResponse(responseObject<McpUpdateTableResponseData>(data));
  }
}
