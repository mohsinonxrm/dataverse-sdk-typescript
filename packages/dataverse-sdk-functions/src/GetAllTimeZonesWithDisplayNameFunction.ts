import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from GetAllTimeZonesWithDisplayName function
 */
export interface GetAllTimeZonesWithDisplayNameResponse {
  value: EntityReference[];
}

/**
 * GetAllTimeZonesWithDisplayName function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.timezonedefinition))
 */
export class GetAllTimeZonesWithDisplayNameFunction implements Executable<GetAllTimeZonesWithDisplayNameResponse> {
  constructor(public readonly localeId: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/timezonedefinitions/Microsoft.Dynamics.CRM.GetAllTimeZonesWithDisplayName`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.localeId !== undefined) {
      aliases.push(`LocaleId=@p1`);
      params.append("@p1", formatParameterAlias(this.localeId, "Edm.Int32"));
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
    const data = await response.json();
    return data as GetAllTimeZonesWithDisplayNameResponse;
  }
}
