import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from OnBackgroundOperationComplete action
 */
export interface OnBackgroundOperationCompleteResponse {
  BackgroundOperationStatusCode: number;
  OperationName: string;
  BackgroundOperationStateCode: number;
}

/**
 * OnBackgroundOperationComplete action
 *
 * Unbound action
 */
export class OnBackgroundOperationCompleteAction implements Executable<OnBackgroundOperationCompleteResponse> {
  constructor(
    public readonly locationUrl: string,
    public readonly callbackUrl: string,
    public readonly backgroundOperationId: string,
    public readonly payloadType: number
  ) {}

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
    return data as OnBackgroundOperationCompleteResponse;
  }
}
