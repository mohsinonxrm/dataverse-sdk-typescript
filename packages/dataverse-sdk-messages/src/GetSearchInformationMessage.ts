import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the GetSearchInformation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetSearchInformationRequestParameters {
  Fetchxml: string;
}

/**
 * GetSearchInformation request message
 *
 * Web API Function: GetSearchInformation
 */
export class GetSearchInformationRequest
  extends OrganizationRequest
  implements Executable<GetSearchInformationResponse>
{
  declare readonly Parameters: Readonly<GetSearchInformationRequestParameters>;

  constructor(parameters: GetSearchInformationRequestParameters) {
    super("GetSearchInformation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetSearchInformation`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Fetchxml !== undefined) {
      aliases.push(`Fetchxml=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.Fetchxml, "Edm.String"));
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

  async parseResponse(response: Response): Promise<GetSearchInformationResponse> {
    // The body is the complex value, with its @odata.context
    return GetSearchInformationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetSearchInformation function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetSearchInformationResult {
  "@odata.context"?: string;
  CanAllowLeadingWildCardSearch: string;
  CanSupportedByRelevanceSearch: string;
}

/**
 * GetSearchInformation response message
 *
 * `result` is the value the GetSearchInformation function returns (see {@link GetSearchInformationResult}).
 */
export class GetSearchInformationResponse extends OrganizationResponse {
  constructor(public result: GetSearchInformationResult) {
    super("GetSearchInformation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetSearchInformationResponse {
    return new GetSearchInformationResponse(data as GetSearchInformationResult);
  }
}
