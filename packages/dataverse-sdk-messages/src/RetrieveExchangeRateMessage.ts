import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveExchangeRate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveExchangeRateRequestParameters {
  TransactionCurrencyId: string;
}

/**
 * RetrieveExchangeRate request message
 *
 * Web API Function: RetrieveExchangeRate
 */
export class RetrieveExchangeRateRequest
  extends OrganizationRequest
  implements Executable<RetrieveExchangeRateResponse>
{
  declare readonly Parameters: Readonly<RetrieveExchangeRateRequestParameters>;

  constructor(parameters: RetrieveExchangeRateRequestParameters) {
    super("RetrieveExchangeRate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveExchangeRate`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.TransactionCurrencyId !== undefined) {
      aliases.push(`TransactionCurrencyId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.TransactionCurrencyId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveExchangeRateResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveExchangeRateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveExchangeRate function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveExchangeRateResult {
  "@odata.context"?: string;
  ExchangeRate: number;
}

/**
 * RetrieveExchangeRate response message
 *
 * `result` is the value the RetrieveExchangeRate function returns (see {@link RetrieveExchangeRateResult}).
 */
export class RetrieveExchangeRateResponse extends OrganizationResponse {
  constructor(public result: RetrieveExchangeRateResult) {
    super("RetrieveExchangeRate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveExchangeRateResponse {
    return new RetrieveExchangeRateResponse(data as RetrieveExchangeRateResult);
  }
}
