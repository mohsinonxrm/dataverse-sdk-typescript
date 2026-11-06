import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceBiometricsEnrollFraudsterResponse as CCaaS_VoiceBiometricsEnrollFraudsterResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsEnrollFraudster message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsEnrollFraudsterRequestParameters {
  SessionId?: string;
  FraudsterName: string;
  CorrelationId?: string;
  WatchlistId: string;
}

/**
 * CCaaS_VoiceBiometricsEnrollFraudster request message
 *
 * Web API Action: CCaaS_VoiceBiometricsEnrollFraudster
 *
 * The first argument is the id of the msdyn_fraudresult record to call it on.
 */
export class CCaaS_VoiceBiometricsEnrollFraudsterRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsEnrollFraudsterResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsEnrollFraudsterRequestParameters>;

  constructor(
    public msdyn_fraudresultId: string,
    parameters: CCaaS_VoiceBiometricsEnrollFraudsterRequestParameters
  ) {
    super("CCaaS_VoiceBiometricsEnrollFraudster", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudresults(${this.msdyn_fraudresultId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsEnrollFraudster`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      FraudsterName: this.Parameters.FraudsterName,
      CorrelationId: this.Parameters.CorrelationId,
      WatchlistId: this.Parameters.WatchlistId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsEnrollFraudsterResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_VoiceBiometricsEnrollFraudsterResponse.fromResponse({});
    return CCaaS_VoiceBiometricsEnrollFraudsterResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceBiometricsEnrollFraudster response message
 */
export class CCaaS_VoiceBiometricsEnrollFraudsterResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsEnrollFraudsterResponseData) {
    super("CCaaS_VoiceBiometricsEnrollFraudster");
  }

  static fromResponse(data: unknown): CCaaS_VoiceBiometricsEnrollFraudsterResponse {
    return new CCaaS_VoiceBiometricsEnrollFraudsterResponse(
      responseObject<CCaaS_VoiceBiometricsEnrollFraudsterResponseData>(data)
    );
  }
}
