import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * OnBackgroundOperationComplete request message
 *
 * Web API Action: OnBackgroundOperationComplete
 */
export class OnBackgroundOperationCompleteRequest
  extends OrganizationRequest
  implements Executable<OnBackgroundOperationCompleteResponse>
{
  constructor(
    public locationUrl: string,
    public callbackUrl: string,
    public backgroundOperationId: string,
    public payloadType: number
  ) {
    super("OnBackgroundOperationComplete");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnBackgroundOperationComplete`;

    const body: Record<string, unknown> = {
      LocationUrl: this.locationUrl,
      CallbackUrl: this.callbackUrl,
      BackgroundOperationId: this.backgroundOperationId,
      PayloadType: this.payloadType,
    };

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
    const data = await response.json();
    return OnBackgroundOperationCompleteResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LocationUrl: this.locationUrl,
      CallbackUrl: this.callbackUrl,
      BackgroundOperationId: this.backgroundOperationId,
      PayloadType: this.payloadType,
    };
  }
}

/**
 * OnBackgroundOperationComplete response message
 */
export class OnBackgroundOperationCompleteResponse extends OrganizationResponse {
  constructor(public result: OnBackgroundOperationCompleteResponse) {
    super("OnBackgroundOperationComplete");
  }

  static fromResponse(data: unknown): OnBackgroundOperationCompleteResponse {
    return new OnBackgroundOperationCompleteResponse((data as any).value);
  }
}
