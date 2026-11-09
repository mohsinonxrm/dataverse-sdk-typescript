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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<_ValidateAndAllocateBusinessCardReaderCurrencyResponse> {
    // The body is the complex value, with its @odata.context
    return _ValidateAndAllocateBusinessCardReaderCurrencyResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the _ValidateAndAllocateBusinessCardReaderCurrency action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _ValidateAndAllocateBusinessCardReaderCurrencyResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * _ValidateAndAllocateBusinessCardReaderCurrency response message
 *
 * `result` is the value the _ValidateAndAllocateBusinessCardReaderCurrency action returns (see {@link _ValidateAndAllocateBusinessCardReaderCurrencyResult}).
 */
export class _ValidateAndAllocateBusinessCardReaderCurrencyResponse extends OrganizationResponse {
  constructor(public result: _ValidateAndAllocateBusinessCardReaderCurrencyResult) {
    super("_ValidateAndAllocateBusinessCardReaderCurrency");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _ValidateAndAllocateBusinessCardReaderCurrencyResponse {
    return new _ValidateAndAllocateBusinessCardReaderCurrencyResponse(
      data as _ValidateAndAllocateBusinessCardReaderCurrencyResult
    );
  }
}
