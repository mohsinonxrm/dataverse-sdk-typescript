import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _ValidateAndAllocateBusinessCardReaderCurrency action
 */
export interface _ValidateAndAllocateBusinessCardReaderCurrencyResponse {
  Response: string;
}

/**
 * _ValidateAndAllocateBusinessCardReaderCurrency action
 *
 * Unbound action
 */
export class _ValidateAndAllocateBusinessCardReaderCurrencyAction implements Executable<_ValidateAndAllocateBusinessCardReaderCurrencyResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ValidateAndAllocateBusinessCardReaderCurrency`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<_ValidateAndAllocateBusinessCardReaderCurrencyResponse> {
    const data = await response.json();
    return data as _ValidateAndAllocateBusinessCardReaderCurrencyResponse;
  }
}
