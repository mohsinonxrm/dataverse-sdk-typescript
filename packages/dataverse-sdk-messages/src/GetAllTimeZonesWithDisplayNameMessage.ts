import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the GetAllTimeZonesWithDisplayName message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetAllTimeZonesWithDisplayNameRequestParameters {
  LocaleId: number;
}

/**
 * GetAllTimeZonesWithDisplayName request message
 *
 * Web API Function: GetAllTimeZonesWithDisplayName
 */
export class GetAllTimeZonesWithDisplayNameRequest
  extends OrganizationRequest
  implements Executable<GetAllTimeZonesWithDisplayNameResponse>
{
  declare readonly Parameters: Readonly<GetAllTimeZonesWithDisplayNameRequestParameters>;

  constructor(parameters: GetAllTimeZonesWithDisplayNameRequestParameters) {
    super("GetAllTimeZonesWithDisplayName", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/timezonedefinitions/Microsoft.Dynamics.CRM.GetAllTimeZonesWithDisplayName`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.LocaleId !== undefined) {
      aliases.push(`LocaleId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.LocaleId, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<GetAllTimeZonesWithDisplayNameResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return GetAllTimeZonesWithDisplayNameResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return GetAllTimeZonesWithDisplayNameResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetAllTimeZonesWithDisplayName function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type GetAllTimeZonesWithDisplayNameResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * GetAllTimeZonesWithDisplayName response message
 *
 * `result` is the value the GetAllTimeZonesWithDisplayName function returns (see {@link GetAllTimeZonesWithDisplayNameResult}).
 */
export class GetAllTimeZonesWithDisplayNameResponse extends OrganizationResponse {
  constructor(public result: GetAllTimeZonesWithDisplayNameResult) {
    super("GetAllTimeZonesWithDisplayName");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetAllTimeZonesWithDisplayNameResponse {
    return new GetAllTimeZonesWithDisplayNameResponse(
      data === undefined ? [] : (data as { value: GetAllTimeZonesWithDisplayNameResult }).value
    );
  }
}
