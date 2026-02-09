import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * _ValidateAndAllocateBusinessCardReaderCurrency request message
 *
 * Web API Action: _ValidateAndAllocateBusinessCardReaderCurrency
 */
export class _ValidateAndAllocateBusinessCardReaderCurrencyRequest
  extends OrganizationRequest
  implements Executable<_ValidateAndAllocateBusinessCardReaderCurrencyResponse>
{
  constructor() {
    super("_ValidateAndAllocateBusinessCardReaderCurrency");
  }

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
    return _ValidateAndAllocateBusinessCardReaderCurrencyResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * _ValidateAndAllocateBusinessCardReaderCurrency response message
 */
export class _ValidateAndAllocateBusinessCardReaderCurrencyResponse extends OrganizationResponse {
  constructor(public result: _ValidateAndAllocateBusinessCardReaderCurrencyResponse) {
    super("_ValidateAndAllocateBusinessCardReaderCurrency");
  }

  static fromResponse(data: unknown): _ValidateAndAllocateBusinessCardReaderCurrencyResponse {
    return new _ValidateAndAllocateBusinessCardReaderCurrencyResponse((data as any).value);
  }
}
