import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return McpUpdateGlobalOptionSetResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the McpUpdateGlobalOptionSet action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface McpUpdateGlobalOptionSetResult {
  "@odata.context"?: string;
  definition: string;
}

/**
 * McpUpdateGlobalOptionSet response message
 *
 * `result` is the value the McpUpdateGlobalOptionSet action returns (see {@link McpUpdateGlobalOptionSetResult}).
 */
export class McpUpdateGlobalOptionSetResponse extends OrganizationResponse {
  constructor(public result: McpUpdateGlobalOptionSetResult) {
    super("McpUpdateGlobalOptionSet");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): McpUpdateGlobalOptionSetResponse {
    return new McpUpdateGlobalOptionSetResponse(data as McpUpdateGlobalOptionSetResult);
  }
}
