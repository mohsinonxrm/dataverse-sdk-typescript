import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { OnBackgroundOperationCompleteResponse as OnBackgroundOperationCompleteResponseData } from "./types/index.js";

/**
 * Parameters of the OnBackgroundOperationComplete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnBackgroundOperationCompleteRequestParameters {
  LocationUrl: string;
  CallbackUrl?: string;
  BackgroundOperationId: string;
  PayloadType: number;
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
      CallbackUrl: this.Parameters.CallbackUrl,
      BackgroundOperationId: this.Parameters.BackgroundOperationId,
      PayloadType: this.Parameters.PayloadType,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return OnBackgroundOperationCompleteResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * OnBackgroundOperationComplete response message
 */
export class OnBackgroundOperationCompleteResponse extends OrganizationResponse {
  constructor(public result: OnBackgroundOperationCompleteResponseData) {
    super("OnBackgroundOperationComplete");
  }

  static fromResponse(data: unknown): OnBackgroundOperationCompleteResponse {
    return new OnBackgroundOperationCompleteResponse(
      responseObject<OnBackgroundOperationCompleteResponseData>(data)
    );
  }
}
