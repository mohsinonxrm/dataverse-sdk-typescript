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
    // 204 No Content is an empty result
    if (response.status === 204) return OnBackgroundOperationCompleteResponse.fromResponse({});
    return OnBackgroundOperationCompleteResponse.fromResponse(await response.json());
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
