import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from RetrieveExchangeRate function
 */
export interface RetrieveExchangeRateResponse {
  ExchangeRate: number;
}

/**
 * RetrieveExchangeRate function
 *
 * Unbound function
 */
export class RetrieveExchangeRateFunction implements Executable<RetrieveExchangeRateResponse> {
  constructor(public readonly transactionCurrencyId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveExchangeRate`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.transactionCurrencyId !== undefined) {
      aliases.push(`TransactionCurrencyId=@p1`);
      params.append("@p1", formatParameterAlias(this.transactionCurrencyId, "Edm.Guid"));
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
    const data = await response.json();
    return data as RetrieveExchangeRateResponse;
  }
}
