import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from OnBackgroundOperationComplete action
 */
export interface OnBackgroundOperationCompleteResponse {
  BackgroundOperationStatusCode: number;
  OperationName: string;
  BackgroundOperationStateCode: number;
}

/**
 * Parameters of the OnBackgroundOperationComplete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnBackgroundOperationCompleteActionParameters {
  LocationUrl: string;
  CallbackUrl?: string;
  BackgroundOperationId: string;
  PayloadType: number;
}

/**
 * OnBackgroundOperationComplete action
 *
 * Unbound action
 */
export class OnBackgroundOperationCompleteAction implements Executable<OnBackgroundOperationCompleteResponse> {
  constructor(public readonly parameters: OnBackgroundOperationCompleteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnBackgroundOperationComplete`;

    const body = requestBody({
      LocationUrl: this.parameters.LocationUrl,
      CallbackUrl: this.parameters.CallbackUrl,
      BackgroundOperationId: this.parameters.BackgroundOperationId,
      PayloadType: this.parameters.PayloadType,
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
    if (response.status === 204) return {} as OnBackgroundOperationCompleteResponse;
    return (await response.json()) as OnBackgroundOperationCompleteResponse;
  }
}
