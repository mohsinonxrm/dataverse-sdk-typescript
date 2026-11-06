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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<_ValidateAndAllocateBusinessCardReaderCurrencyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as _ValidateAndAllocateBusinessCardReaderCurrencyResponse;
    return (await response.json()) as _ValidateAndAllocateBusinessCardReaderCurrencyResponse;
  }
}
