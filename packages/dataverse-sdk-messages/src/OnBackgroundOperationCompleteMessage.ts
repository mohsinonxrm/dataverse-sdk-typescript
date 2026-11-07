import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the OnBackgroundOperationComplete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnBackgroundOperationCompleteRequestParameters {
  LocationUrl: string;
  PayloadType: number;
  CallbackUrl?: string;
  BackgroundOperationId: string;
}

/**
 * OnBackgroundOperationComplete request message
 *
 * Web API Action: OnBackgroundOperationComplete
 */
export class OnBackgroundOperationCompleteRequest
  extends OrganizationRequest
  implements Executable<OnBackgroundOperationCompleteResponse>
{
  declare readonly Parameters: Readonly<OnBackgroundOperationCompleteRequestParameters>;

  constructor(parameters: OnBackgroundOperationCompleteRequestParameters) {
    super("OnBackgroundOperationComplete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnBackgroundOperationComplete`;

    const body = requestBody({
      LocationUrl: this.Parameters.LocationUrl,
      PayloadType: this.Parameters.PayloadType,
      CallbackUrl: this.Parameters.CallbackUrl,
      BackgroundOperationId: this.Parameters.BackgroundOperationId,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<OnBackgroundOperationCompleteResponse> {
    // The body is the complex value, with its @odata.context
    return OnBackgroundOperationCompleteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the OnBackgroundOperationComplete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface OnBackgroundOperationCompleteResult {
  "@odata.context"?: string;
  BackgroundOperationStateCode: number;
  BackgroundOperationStatusCode: number;
  OperationName: string;
}

/**
 * OnBackgroundOperationComplete response message
 *
 * `result` is the value the OnBackgroundOperationComplete action returns (see {@link OnBackgroundOperationCompleteResult}).
 */
export class OnBackgroundOperationCompleteResponse extends OrganizationResponse {
  constructor(public result: OnBackgroundOperationCompleteResult) {
    super("OnBackgroundOperationComplete");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): OnBackgroundOperationCompleteResponse {
    return new OnBackgroundOperationCompleteResponse(data as OnBackgroundOperationCompleteResult);
  }
}
