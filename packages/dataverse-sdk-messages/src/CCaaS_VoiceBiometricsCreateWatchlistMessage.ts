import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceBiometricsCreateWatchlistResponse as CCaaS_VoiceBiometricsCreateWatchlistResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsCreateWatchlist message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsCreateWatchlistRequestParameters {
  Description?: string;
  Name: string;
  SessionId?: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceBiometricsCreateWatchlist request message
 *
 * Web API Action: CCaaS_VoiceBiometricsCreateWatchlist
 */
export class CCaaS_VoiceBiometricsCreateWatchlistRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsCreateWatchlistResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsCreateWatchlistRequestParameters>;

  constructor(parameters: CCaaS_VoiceBiometricsCreateWatchlistRequestParameters) {
    super("CCaaS_VoiceBiometricsCreateWatchlist", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceBiometricsCreateWatchlist`;

    const body = requestBody({
      Description: this.Parameters.Description,
      Name: this.Parameters.Name,
      SessionId: this.Parameters.SessionId,
      CorrelationId: this.Parameters.CorrelationId,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_VoiceBiometricsCreateWatchlistResponse.fromResponse({});
    return CCaaS_VoiceBiometricsCreateWatchlistResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceBiometricsCreateWatchlist response message
 */
export class CCaaS_VoiceBiometricsCreateWatchlistResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsCreateWatchlistResponseData) {
    super("CCaaS_VoiceBiometricsCreateWatchlist");
  }

  static fromResponse(data: unknown): CCaaS_VoiceBiometricsCreateWatchlistResponse {
    return new CCaaS_VoiceBiometricsCreateWatchlistResponse(
      responseObject<CCaaS_VoiceBiometricsCreateWatchlistResponseData>(data)
    );
  }
}
