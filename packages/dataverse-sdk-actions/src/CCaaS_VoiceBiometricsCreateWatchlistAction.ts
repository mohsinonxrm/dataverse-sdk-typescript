import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_VoiceBiometricsCreateWatchlist action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsCreateWatchlistResponse {
  "@odata.context"?: string;
  BadRequestReason: string;
  ErrorMessage: string;
  StatusCode: string;
  WatchlistId: string;
}

/**
 * Parameters of the CCaaS_VoiceBiometricsCreateWatchlist action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsCreateWatchlistActionParameters {
  Description?: string;
  Name: string;
  SessionId?: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceBiometricsCreateWatchlist action
 *
 * Unbound action
 */
export class CCaaS_VoiceBiometricsCreateWatchlistAction implements Executable<CCaaS_VoiceBiometricsCreateWatchlistResponse> {
  constructor(public readonly parameters: CCaaS_VoiceBiometricsCreateWatchlistActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceBiometricsCreateWatchlist`;

    const body = requestBody({
      Description: this.parameters.Description,
      Name: this.parameters.Name,
      SessionId: this.parameters.SessionId,
      CorrelationId: this.parameters.CorrelationId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsCreateWatchlistResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_VoiceBiometricsCreateWatchlistResponse;
  }
}
