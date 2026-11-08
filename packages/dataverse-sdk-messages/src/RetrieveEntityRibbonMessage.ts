import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RibbonLocationFilters } from "./types/index.js";

/**
 * Parameters of the RetrieveEntityRibbon message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEntityRibbonRequestParameters {
  EntityName: string;
  RibbonLocationFilter: RibbonLocationFilters | keyof typeof RibbonLocationFilters;
}

/**
 * RetrieveEntityRibbon request message
 *
 * Web API Function: RetrieveEntityRibbon
 */
export class RetrieveEntityRibbonRequest
  extends OrganizationRequest
  implements Executable<RetrieveEntityRibbonResponse>
{
  declare readonly Parameters: Readonly<RetrieveEntityRibbonRequestParameters>;

  constructor(parameters: RetrieveEntityRibbonRequestParameters) {
    super("RetrieveEntityRibbon", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEntityRibbon`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.EntityName !== undefined) {
      aliases.push(`EntityName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.EntityName, "Edm.String"));
    }
    if (this.Parameters.RibbonLocationFilter !== undefined) {
      aliases.push(`RibbonLocationFilter=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(
          this.Parameters.RibbonLocationFilter,
          "mscrm.RibbonLocationFilters",
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

  async parseResponse(response: Response): Promise<RetrieveEntityRibbonResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveEntityRibbonResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveEntityRibbon function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveEntityRibbonResult {
  "@odata.context"?: string;
  CompressedEntityXml: string;
}

/**
 * RetrieveEntityRibbon response message
 *
 * `result` is the value the RetrieveEntityRibbon function returns (see {@link RetrieveEntityRibbonResult}).
 */
export class RetrieveEntityRibbonResponse extends OrganizationResponse {
  constructor(public result: RetrieveEntityRibbonResult) {
    super("RetrieveEntityRibbon");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveEntityRibbonResponse {
    return new RetrieveEntityRibbonResponse(data as RetrieveEntityRibbonResult);
  }
}
