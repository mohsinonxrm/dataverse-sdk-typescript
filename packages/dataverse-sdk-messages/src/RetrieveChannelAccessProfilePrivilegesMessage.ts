import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ChannelAccessProfileWithPrivileges } from "./types/index.js";

/**
 * Parameters of the RetrieveChannelAccessProfilePrivileges message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveChannelAccessProfilePrivilegesRequestParameters {
  ChannelAccessProfileId: string;
}

/**
 * RetrieveChannelAccessProfilePrivileges request message
 *
 * Web API Function: RetrieveChannelAccessProfilePrivileges
 */
export class RetrieveChannelAccessProfilePrivilegesRequest
  extends OrganizationRequest
  implements Executable<RetrieveChannelAccessProfilePrivilegesResponse>
{
  declare readonly Parameters: Readonly<RetrieveChannelAccessProfilePrivilegesRequestParameters>;

  constructor(parameters: RetrieveChannelAccessProfilePrivilegesRequestParameters) {
    super("RetrieveChannelAccessProfilePrivileges", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveChannelAccessProfilePrivileges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ChannelAccessProfileId !== undefined) {
      aliases.push(`ChannelAccessProfileId=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.ChannelAccessProfileId, "Edm.Guid")
      );
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

  async parseResponse(response: Response): Promise<RetrieveChannelAccessProfilePrivilegesResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveChannelAccessProfilePrivilegesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveChannelAccessProfilePrivileges function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveChannelAccessProfilePrivilegesResult {
  "@odata.context"?: string;
  ChannelAccessProfile: ChannelAccessProfileWithPrivileges;
}

/**
 * RetrieveChannelAccessProfilePrivileges response message
 *
 * `result` is the value the RetrieveChannelAccessProfilePrivileges function returns (see {@link RetrieveChannelAccessProfilePrivilegesResult}).
 */
export class RetrieveChannelAccessProfilePrivilegesResponse extends OrganizationResponse {
  constructor(public result: RetrieveChannelAccessProfilePrivilegesResult) {
    super("RetrieveChannelAccessProfilePrivileges");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveChannelAccessProfilePrivilegesResponse {
    return new RetrieveChannelAccessProfilePrivilegesResponse(
      data as RetrieveChannelAccessProfilePrivilegesResult
    );
  }
}
