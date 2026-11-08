import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the McpGetGlobalOptionSet message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpGetGlobalOptionSetRequestParameters {
  optionSetName: string;
}

/**
 * McpGetGlobalOptionSet request message
 *
 * Web API Function: McpGetGlobalOptionSet
 */
export class McpGetGlobalOptionSetRequest
  extends OrganizationRequest
  implements Executable<McpGetGlobalOptionSetResponse>
{
  declare readonly Parameters: Readonly<McpGetGlobalOptionSetRequestParameters>;

  constructor(parameters: McpGetGlobalOptionSetRequestParameters) {
    super("McpGetGlobalOptionSet", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/McpGetGlobalOptionSet`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.optionSetName !== undefined) {
      aliases.push(`optionSetName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.optionSetName, "Edm.String"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<McpGetGlobalOptionSetResponse> {
    // The body is the complex value, with its @odata.context
    return McpGetGlobalOptionSetResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the McpGetGlobalOptionSet function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface McpGetGlobalOptionSetResult {
  "@odata.context"?: string;
  definition: string;
}

/**
 * McpGetGlobalOptionSet response message
 *
 * `result` is the value the McpGetGlobalOptionSet function returns (see {@link McpGetGlobalOptionSetResult}).
 */
export class McpGetGlobalOptionSetResponse extends OrganizationResponse {
  constructor(public result: McpGetGlobalOptionSetResult) {
    super("McpGetGlobalOptionSet");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): McpGetGlobalOptionSetResponse {
    return new McpGetGlobalOptionSetResponse(data as McpGetGlobalOptionSetResult);
  }
}
