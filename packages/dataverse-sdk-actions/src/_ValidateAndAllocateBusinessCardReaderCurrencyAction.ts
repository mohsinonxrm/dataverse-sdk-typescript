import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the _ValidateAndAllocateBusinessCardReaderCurrency action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _ValidateAndAllocateBusinessCardReaderCurrencyResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as _ValidateAndAllocateBusinessCardReaderCurrencyResponse;
  }
}
