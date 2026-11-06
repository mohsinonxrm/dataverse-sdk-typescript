import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the OnBackgroundOperationComplete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface OnBackgroundOperationCompleteResponse {
  "@odata.context"?: string;
  BackgroundOperationStateCode: number;
  BackgroundOperationStatusCode: number;
  OperationName: string;
}

/**
 * Parameters of the OnBackgroundOperationComplete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnBackgroundOperationCompleteActionParameters {
  LocationUrl: string;
  PayloadType: number;
  CallbackUrl?: string;
  BackgroundOperationId: string;
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
      PayloadType: this.parameters.PayloadType,
      CallbackUrl: this.parameters.CallbackUrl,
      BackgroundOperationId: this.parameters.BackgroundOperationId,
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
    return (await response.json()) as OnBackgroundOperationCompleteResponse;
  }
}
