import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { McpUpdateGlobalOptionSetResponse as McpUpdateGlobalOptionSetResponseData } from "./types/index.js";

/**
 * Parameters of the McpUpdateGlobalOptionSet message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpUpdateGlobalOptionSetRequestParameters {
  languageCode: number;
  optionSetName: string;
  confirmSharedImpact: boolean;
  choices: string;
}

/**
 * McpUpdateGlobalOptionSet request message
 *
 * Web API Action: McpUpdateGlobalOptionSet
 */
export class McpUpdateGlobalOptionSetRequest
  extends OrganizationRequest
  implements Executable<McpUpdateGlobalOptionSetResponse>
{
  declare readonly Parameters: Readonly<McpUpdateGlobalOptionSetRequestParameters>;

  constructor(parameters: McpUpdateGlobalOptionSetRequestParameters) {
    super("McpUpdateGlobalOptionSet", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpUpdateGlobalOptionSet`;

    const body = requestBody({
      languageCode: this.Parameters.languageCode,
      optionSetName: this.Parameters.optionSetName,
      confirmSharedImpact: this.Parameters.confirmSharedImpact,
      choices: this.Parameters.choices,
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

  async parseResponse(response: Response): Promise<McpUpdateGlobalOptionSetResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return McpUpdateGlobalOptionSetResponse.fromResponse({});
    return McpUpdateGlobalOptionSetResponse.fromResponse(await response.json());
  }
}

/**
 * McpUpdateGlobalOptionSet response message
 */
export class McpUpdateGlobalOptionSetResponse extends OrganizationResponse {
  constructor(public result: McpUpdateGlobalOptionSetResponseData) {
    super("McpUpdateGlobalOptionSet");
  }

  static fromResponse(data: unknown): McpUpdateGlobalOptionSetResponse {
    return new McpUpdateGlobalOptionSetResponse(
      responseObject<McpUpdateGlobalOptionSetResponseData>(data)
    );
  }
}
