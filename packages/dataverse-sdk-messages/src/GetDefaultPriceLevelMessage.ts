import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { pricelevel } from "./types/index.js";

/**
 * Parameters of the GetDefaultPriceLevel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetDefaultPriceLevelRequestParameters {
  EntityName: string;
}

/**
 * GetDefaultPriceLevel request message
 *
 * Web API Function: GetDefaultPriceLevel
 */
export class GetDefaultPriceLevelRequest
  extends OrganizationRequest
  implements Executable<GetDefaultPriceLevelResponse>
{
  declare readonly Parameters: Readonly<GetDefaultPriceLevelRequestParameters>;

  constructor(parameters: GetDefaultPriceLevelRequestParameters) {
    super("GetDefaultPriceLevel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/pricelevels/Microsoft.Dynamics.CRM.GetDefaultPriceLevel`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.EntityName !== undefined) {
      aliases.push(`EntityName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.EntityName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<GetDefaultPriceLevelResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return GetDefaultPriceLevelResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return GetDefaultPriceLevelResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetDefaultPriceLevel function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type GetDefaultPriceLevelResult = Array<
  pricelevel & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * GetDefaultPriceLevel response message
 *
 * `result` is the value the GetDefaultPriceLevel function returns (see {@link GetDefaultPriceLevelResult}).
 */
export class GetDefaultPriceLevelResponse extends OrganizationResponse {
  constructor(public result: GetDefaultPriceLevelResult) {
    super("GetDefaultPriceLevel");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetDefaultPriceLevelResponse {
    return new GetDefaultPriceLevelResponse(
      data === undefined ? [] : (data as { value: GetDefaultPriceLevelResult }).value
    );
  }
}
