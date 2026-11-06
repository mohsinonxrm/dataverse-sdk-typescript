import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from RetrieveExchangeRate function
 */
export interface RetrieveExchangeRateResponse {
  ExchangeRate: number;
}

/**
 * Parameters of the RetrieveExchangeRate function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveExchangeRateFunctionParameters {
  TransactionCurrencyId: string;
}

/**
 * RetrieveExchangeRate function
 *
 * Unbound function
 */
export class RetrieveExchangeRateFunction implements Executable<RetrieveExchangeRateResponse> {
  constructor(public readonly parameters: RetrieveExchangeRateFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveExchangeRate`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.TransactionCurrencyId !== undefined) {
      aliases.push(`TransactionCurrencyId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.TransactionCurrencyId, "Edm.Guid"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveExchangeRateResponse;
    return (await response.json()) as RetrieveExchangeRateResponse;
  }
}
