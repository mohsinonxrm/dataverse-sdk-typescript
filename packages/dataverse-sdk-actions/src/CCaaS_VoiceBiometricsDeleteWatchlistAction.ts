import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_VoiceBiometricsDeleteWatchlist action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsDeleteWatchlistResponse {
  "@odata.context"?: string;
  BadRequestReason: string;
  ErrorMessage: string;
  StatusCode: string;
  WatchlistId: string;
}

/**
 * Parameters of the CCaaS_VoiceBiometricsDeleteWatchlist action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsDeleteWatchlistActionParameters {
  SessionId?: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceBiometricsDeleteWatchlist action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_fraudsterdetectionwatchlist)
 *
 * The first argument is the id of the msdyn_fraudsterdetectionwatchlist record to call it on.
 */
export class CCaaS_VoiceBiometricsDeleteWatchlistAction implements Executable<CCaaS_VoiceBiometricsDeleteWatchlistResponse> {
  constructor(
    public readonly msdyn_fraudsterdetectionwatchlistId: string,
    public readonly parameters: CCaaS_VoiceBiometricsDeleteWatchlistActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudsterdetectionwatchlists(${this.msdyn_fraudsterdetectionwatchlistId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsDeleteWatchlist`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsDeleteWatchlistResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_VoiceBiometricsDeleteWatchlistResponse;
  }
}
