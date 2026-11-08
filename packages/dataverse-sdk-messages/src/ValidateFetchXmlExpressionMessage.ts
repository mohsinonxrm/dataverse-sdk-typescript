import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ValidateFetchXmlExpressionResult as ValidateFetchXmlExpressionResultData } from "./types/index.js";

/**
 * Parameters of the ValidateFetchXmlExpression message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateFetchXmlExpressionRequestParameters {
  FetchXml: string;
}

/**
 * ValidateFetchXmlExpression request message
 *
 * Web API Function: ValidateFetchXmlExpression
 */
export class ValidateFetchXmlExpressionRequest
  extends OrganizationRequest
  implements Executable<ValidateFetchXmlExpressionResponse>
{
  declare readonly Parameters: Readonly<ValidateFetchXmlExpressionRequestParameters>;

  constructor(parameters: ValidateFetchXmlExpressionRequestParameters) {
    super("ValidateFetchXmlExpression", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ValidateFetchXmlExpression`;

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

  async parseResponse(response: Response): Promise<ValidateFetchXmlExpressionResponse> {
    // The body is the complex value, with its @odata.context
    return ValidateFetchXmlExpressionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ValidateFetchXmlExpression function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ValidateFetchXmlExpressionResult {
  "@odata.context"?: string;
  ValidationResults: ValidateFetchXmlExpressionResultData;
}

/**
 * ValidateFetchXmlExpression response message
 *
 * `result` is the value the ValidateFetchXmlExpression function returns (see {@link ValidateFetchXmlExpressionResult}).
 */
export class ValidateFetchXmlExpressionResponse extends OrganizationResponse {
  constructor(public result: ValidateFetchXmlExpressionResult) {
    super("ValidateFetchXmlExpression");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ValidateFetchXmlExpressionResponse {
    return new ValidateFetchXmlExpressionResponse(data as ValidateFetchXmlExpressionResult);
  }
}
