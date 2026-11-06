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
 * Parameters of the FetchXmlToQueryExpression function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FetchXmlToQueryExpressionFunctionParameters {
  FetchXml: string;
}

/**
 * FetchXmlToQueryExpression function
 *
 * Unbound function
 */
export class FetchXmlToQueryExpressionFunction implements Executable<FetchXmlToQueryExpressionResponse> {
  constructor(public readonly parameters: FetchXmlToQueryExpressionFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/FetchXmlToQueryExpression`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.FetchXml !== undefined) {
      aliases.push(`FetchXml=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.FetchXml, "Edm.String"));
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as FetchXmlToQueryExpressionResponse;
  }
}
