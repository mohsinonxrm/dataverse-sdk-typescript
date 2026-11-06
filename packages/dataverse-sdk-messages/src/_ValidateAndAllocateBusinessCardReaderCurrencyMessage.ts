import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { _ValidateAndAllocateBusinessCardReaderCurrencyResponse as _ValidateAndAllocateBusinessCardReaderCurrencyResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<_ValidateAndAllocateBusinessCardReaderCurrencyResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return _ValidateAndAllocateBusinessCardReaderCurrencyResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * _ValidateAndAllocateBusinessCardReaderCurrency response message
 */
export class _ValidateAndAllocateBusinessCardReaderCurrencyResponse extends OrganizationResponse {
  constructor(public result: _ValidateAndAllocateBusinessCardReaderCurrencyResponseData) {
    super("_ValidateAndAllocateBusinessCardReaderCurrency");
  }

  static fromResponse(data: unknown): _ValidateAndAllocateBusinessCardReaderCurrencyResponse {
    return new _ValidateAndAllocateBusinessCardReaderCurrencyResponse(
      responseObject<_ValidateAndAllocateBusinessCardReaderCurrencyResponseData>(data)
    );
  }
}
