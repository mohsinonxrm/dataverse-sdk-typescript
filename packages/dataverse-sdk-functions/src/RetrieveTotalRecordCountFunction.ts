import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from the RetrieveTotalRecordCount function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveTotalRecordCountResponse {
  "@odata.context"?: string;
  EntityRecordCountCollection: EntityRecordCountCollection;
}

/**
 * Parameters of the RetrieveTotalRecordCount function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveTotalRecordCountFunctionParameters {
  EntityNames: string[];
}

/**
 * RetrieveTotalRecordCount function
 *
 * Unbound function
 */
export class RetrieveTotalRecordCountFunction implements Executable<RetrieveTotalRecordCountResponse> {
  constructor(public readonly parameters: RetrieveTotalRecordCountFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveTotalRecordCount`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityNames !== undefined) {
      aliases.push(`EntityNames=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.EntityNames, "Collection(Edm.String)", "Collection")
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

  async parseResponse(response: Response): Promise<RetrieveTotalRecordCountResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveTotalRecordCountResponse;
  }
}
