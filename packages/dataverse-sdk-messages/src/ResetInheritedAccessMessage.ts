import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the ResetInheritedAccess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ResetInheritedAccessRequestParameters {
  FetchXml: string;
}

/**
 * ResetInheritedAccess request message
 *
 * Web API Function: ResetInheritedAccess
 */
export class ResetInheritedAccessRequest
  extends OrganizationRequest
  implements Executable<ResetInheritedAccessResponse>
{
  declare readonly Parameters: Readonly<ResetInheritedAccessRequestParameters>;

  constructor(parameters: ResetInheritedAccessRequestParameters) {
    super("ResetInheritedAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ResetInheritedAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.FetchXml !== undefined) {
      aliases.push(`FetchXml=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.FetchXml, "Edm.String"));
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

  async parseResponse(response: Response): Promise<ResetInheritedAccessResponse> {
    // The body is the complex value, with its @odata.context
    return ResetInheritedAccessResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ResetInheritedAccess function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ResetInheritedAccessResult {
  "@odata.context"?: string;
  ResetInheritedAccessResponse: string;
}

/**
 * ResetInheritedAccess response message
 *
 * `result` is the value the ResetInheritedAccess function returns (see {@link ResetInheritedAccessResult}).
 */
export class ResetInheritedAccessResponse extends OrganizationResponse {
  constructor(public result: ResetInheritedAccessResult) {
    super("ResetInheritedAccess");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ResetInheritedAccessResponse {
    return new ResetInheritedAccessResponse(data as ResetInheritedAccessResult);
  }
}
