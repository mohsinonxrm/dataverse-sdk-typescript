import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GetTrackingTokenEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetTrackingTokenEmailResponse {
  "@odata.context"?: string;
  TrackingToken: string;
}

/**
 * Parameters of the GetTrackingTokenEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetTrackingTokenEmailActionParameters {
  Subject?: string;
}

/**
 * GetTrackingTokenEmail action
 *
 * Unbound action
 */
export class GetTrackingTokenEmailAction implements Executable<GetTrackingTokenEmailResponse> {
  constructor(public readonly parameters: GetTrackingTokenEmailActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetTrackingTokenEmail`;

    const body = requestBody({
      Subject: this.parameters.Subject,
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

  async parseResponse(response: Response): Promise<GetTrackingTokenEmailResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetTrackingTokenEmailResponse;
  }
}
