import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { QueryExpression } from "./types/index.js";

/**
 * Parameters of the FetchXmlToQueryExpression message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FetchXmlToQueryExpressionRequestParameters {
  FetchXml: string;
}

/**
 * FetchXmlToQueryExpression request message
 *
 * Web API Function: FetchXmlToQueryExpression
 */
export class FetchXmlToQueryExpressionRequest
  extends OrganizationRequest
  implements Executable<FetchXmlToQueryExpressionResponse>
{
  declare readonly Parameters: Readonly<FetchXmlToQueryExpressionRequestParameters>;

  constructor(parameters: FetchXmlToQueryExpressionRequestParameters) {
    super("FetchXmlToQueryExpression", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/FetchXmlToQueryExpression`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.FetchXml !== undefined) {
      aliases.push(`FetchXml=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.FetchXml, "Edm.String"));
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
    // The body is the complex value, with its @odata.context
    return FetchXmlToQueryExpressionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the FetchXmlToQueryExpression function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface FetchXmlToQueryExpressionResult {
  "@odata.context"?: string;
  Query: QueryExpression;
}

/**
 * FetchXmlToQueryExpression response message
 *
 * `result` is the value the FetchXmlToQueryExpression function returns (see {@link FetchXmlToQueryExpressionResult}).
 */
export class FetchXmlToQueryExpressionResponse extends OrganizationResponse {
  constructor(public result: FetchXmlToQueryExpressionResult) {
    super("FetchXmlToQueryExpression");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): FetchXmlToQueryExpressionResponse {
    return new FetchXmlToQueryExpressionResponse(data as FetchXmlToQueryExpressionResult);
  }
}
