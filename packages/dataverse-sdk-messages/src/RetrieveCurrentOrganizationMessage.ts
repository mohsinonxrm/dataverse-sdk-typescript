import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EndpointAccessType, OrganizationDetail } from "./types/index.js";

/**
 * Parameters of the RetrieveCurrentOrganization message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveCurrentOrganizationRequestParameters {
  AccessType: EndpointAccessType | keyof typeof EndpointAccessType;
}

/**
 * RetrieveCurrentOrganization request message
 *
 * Web API Function: RetrieveCurrentOrganization
 */
export class RetrieveCurrentOrganizationRequest
  extends OrganizationRequest
  implements Executable<RetrieveCurrentOrganizationResponse>
{
  declare readonly Parameters: Readonly<RetrieveCurrentOrganizationRequestParameters>;

  constructor(parameters: RetrieveCurrentOrganizationRequestParameters) {
    super("RetrieveCurrentOrganization", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCurrentOrganization`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.AccessType !== undefined) {
      aliases.push(`AccessType=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(
          this.Parameters.AccessType,
          "mscrm.EndpointAccessType",
          "EnumerationType"
        )
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

  async parseResponse(response: Response): Promise<RetrieveCurrentOrganizationResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveCurrentOrganizationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveCurrentOrganization function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveCurrentOrganizationResult {
  "@odata.context"?: string;
  Detail: OrganizationDetail;
}

/**
 * RetrieveCurrentOrganization response message
 *
 * `result` is the value the RetrieveCurrentOrganization function returns (see {@link RetrieveCurrentOrganizationResult}).
 */
export class RetrieveCurrentOrganizationResponse extends OrganizationResponse {
  constructor(public result: RetrieveCurrentOrganizationResult) {
    super("RetrieveCurrentOrganization");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveCurrentOrganizationResponse {
    return new RetrieveCurrentOrganizationResponse(data as RetrieveCurrentOrganizationResult);
  }
}
