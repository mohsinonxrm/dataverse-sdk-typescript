import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { QueryExpression } from "./types/index.js";

/**
 * Response from FetchXmlToQueryExpression function
 */
export interface FetchXmlToQueryExpressionResponse {
  Query: QueryExpression;
}

/**
 * FetchXmlToQueryExpression function
 *
 * Unbound function
 */
export class FetchXmlToQueryExpressionFunction implements Executable<FetchXmlToQueryExpressionResponse> {
  constructor(public readonly fetchXml: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/FetchXmlToQueryExpression`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.fetchXml !== undefined) {
      aliases.push(`FetchXml=@p1`);
      params.append("@p1", formatParameterAlias(this.fetchXml, "Edm.String"));
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

  async parseResponse(response: Response): Promise<FetchXmlToQueryExpressionResponse> {
    const data = await response.json();
    return data as FetchXmlToQueryExpressionResponse;
  }
}
