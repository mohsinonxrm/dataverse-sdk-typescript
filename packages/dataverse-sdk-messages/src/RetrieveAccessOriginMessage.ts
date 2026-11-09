import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveAccessOrigin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAccessOriginRequestParameters {
  ObjectId: string;
  LogicalName: string;
  PrincipalId: string;
}

/**
 * RetrieveAccessOrigin request message
 *
 * Web API Function: RetrieveAccessOrigin
 */
export class RetrieveAccessOriginRequest
  extends OrganizationRequest
  implements Executable<RetrieveAccessOriginResponse>
{
  declare readonly Parameters: Readonly<RetrieveAccessOriginRequestParameters>;

  constructor(parameters: RetrieveAccessOriginRequestParameters) {
    super("RetrieveAccessOrigin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAccessOrigin`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ObjectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ObjectId, "Edm.Guid"));
    }
    if (this.Parameters.LogicalName !== undefined) {
      aliases.push(`LogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.LogicalName, "Edm.String"));
    }
    if (this.Parameters.PrincipalId !== undefined) {
      aliases.push(`PrincipalId=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.PrincipalId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveAccessOriginResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveAccessOriginResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAccessOrigin function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAccessOriginResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * RetrieveAccessOrigin response message
 *
 * `result` is the value the RetrieveAccessOrigin function returns (see {@link RetrieveAccessOriginResult}).
 */
export class RetrieveAccessOriginResponse extends OrganizationResponse {
  constructor(public result: RetrieveAccessOriginResult) {
    super("RetrieveAccessOrigin");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAccessOriginResponse {
    return new RetrieveAccessOriginResponse(data as RetrieveAccessOriginResult);
  }
}
