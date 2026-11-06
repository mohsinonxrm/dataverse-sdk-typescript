import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_VoiceBiometricsUpdateWatchlist action
 */
export interface CCaaS_VoiceBiometricsUpdateWatchlistResponse {
  BadRequestReason: string;
  ErrorMessage: string;
  StatusCode: string;
  WatchlistId: string;
}

/**
 * Parameters of the CCaaS_VoiceBiometricsUpdateWatchlist action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsUpdateWatchlistActionParameters {
  SessionId?: string;
  Description?: string;
  CorrelationId?: string;
  Name?: string;
}

/**
 * CCaaS_VoiceBiometricsUpdateWatchlist action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_fraudsterdetectionwatchlist)
 *
 * The first argument is the id of the msdyn_fraudsterdetectionwatchlist record to call it on.
 */
export class CCaaS_VoiceBiometricsUpdateWatchlistAction implements Executable<CCaaS_VoiceBiometricsUpdateWatchlistResponse> {
  constructor(
    public readonly msdyn_fraudsterdetectionwatchlistId: string,
    public readonly parameters: CCaaS_VoiceBiometricsUpdateWatchlistActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudsterdetectionwatchlists(${this.msdyn_fraudsterdetectionwatchlistId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsUpdateWatchlist`;

    const body = requestBody({
      SessionId: this.parameters.SessionId,
      Description: this.parameters.Description,
      CorrelationId: this.parameters.CorrelationId,
      Name: this.parameters.Name,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsUpdateWatchlistResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_VoiceBiometricsUpdateWatchlistResponse;
    return (await response.json()) as CCaaS_VoiceBiometricsUpdateWatchlistResponse;
  }
}
