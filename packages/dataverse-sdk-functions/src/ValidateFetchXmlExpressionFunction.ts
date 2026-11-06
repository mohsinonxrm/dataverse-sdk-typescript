import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ValidateFetchXmlExpressionResult } from "./types/index.js";

/**
 * Response from ValidateFetchXmlExpression function
 */
export interface ValidateFetchXmlExpressionResponse {
  ValidationResults: ValidateFetchXmlExpressionResult;
}

/**
 * Parameters of the ValidateFetchXmlExpression function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateFetchXmlExpressionFunctionParameters {
  FetchXml: string;
}

/**
 * ValidateFetchXmlExpression function
 *
 * Unbound function
 */
export class ValidateFetchXmlExpressionFunction implements Executable<ValidateFetchXmlExpressionResponse> {
  constructor(public readonly parameters: ValidateFetchXmlExpressionFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ValidateFetchXmlExpression`;

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

  async parseResponse(response: Response): Promise<ValidateFetchXmlExpressionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ValidateFetchXmlExpressionResponse;
    return (await response.json()) as ValidateFetchXmlExpressionResponse;
  }
}
