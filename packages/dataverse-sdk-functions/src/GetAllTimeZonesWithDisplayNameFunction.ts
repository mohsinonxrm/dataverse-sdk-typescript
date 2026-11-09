import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the GetAllTimeZonesWithDisplayName function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type GetAllTimeZonesWithDisplayNameResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the GetAllTimeZonesWithDisplayName function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetAllTimeZonesWithDisplayNameFunctionParameters {
  LocaleId: number;
}

/**
 * GetAllTimeZonesWithDisplayName function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.timezonedefinition))
 */
export class GetAllTimeZonesWithDisplayNameFunction implements Executable<GetAllTimeZonesWithDisplayNameResponse> {
  constructor(public readonly parameters: GetAllTimeZonesWithDisplayNameFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/timezonedefinitions/Microsoft.Dynamics.CRM.GetAllTimeZonesWithDisplayName`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.LocaleId !== undefined) {
      aliases.push(`LocaleId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.LocaleId, "Edm.Int32"));
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
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: GetAllTimeZonesWithDisplayNameResponse }).value;
  }
}
