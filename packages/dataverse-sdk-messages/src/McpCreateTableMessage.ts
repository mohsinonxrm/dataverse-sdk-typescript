import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { McpCreateTableResponse as McpCreateTableResponseData } from "./types/index.js";

/**
 * Parameters of the McpCreateTable message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpCreateTableRequestParameters {
  displayname?: string;
  item: string;
  tablename: string;
  description?: string;
}

/**
 * McpCreateTable request message
 *
 * Web API Action: McpCreateTable
 */
export class McpCreateTableRequest
  extends OrganizationRequest
  implements Executable<McpCreateTableResponse>
{
  declare readonly Parameters: Readonly<McpCreateTableRequestParameters>;

  constructor(parameters: McpCreateTableRequestParameters) {
    super("McpCreateTable", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpCreateTable`;

    const body = requestBody({
      displayname: this.Parameters.displayname,
      item: this.Parameters.item,
      tablename: this.Parameters.tablename,
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

  async parseResponse(response: Response): Promise<McpCreateTableResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return McpCreateTableResponse.fromResponse({});
    return McpCreateTableResponse.fromResponse(await response.json());
  }
}

/**
 * McpCreateTable response message
 */
export class McpCreateTableResponse extends OrganizationResponse {
  constructor(public result: McpCreateTableResponseData) {
    super("McpCreateTable");
  }

  static fromResponse(data: unknown): McpCreateTableResponse {
    return new McpCreateTableResponse(responseObject<McpCreateTableResponseData>(data));
  }
}
