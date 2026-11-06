import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceBiometricsDeleteFraudsterResponse as CCaaS_VoiceBiometricsDeleteFraudsterResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsDeleteFraudster message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsDeleteFraudsterRequestParameters {
  CorrelationId?: string;
  SessionId?: string;
  FraudsterIds: string[];
  WatchlistId: string;
}

/**
 * CCaaS_VoiceBiometricsDeleteFraudster request message
 *
 * Web API Action: CCaaS_VoiceBiometricsDeleteFraudster
 */
export class CCaaS_VoiceBiometricsDeleteFraudsterRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsDeleteFraudsterResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsDeleteFraudsterRequestParameters>;

  constructor(parameters: CCaaS_VoiceBiometricsDeleteFraudsterRequestParameters) {
    super("CCaaS_VoiceBiometricsDeleteFraudster", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceBiometricsDeleteFraudster`;

    const body = requestBody({
      CorrelationId: this.Parameters.CorrelationId,
      SessionId: this.Parameters.SessionId,
      FraudsterIds: this.Parameters.FraudsterIds,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsDeleteFraudsterResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_VoiceBiometricsDeleteFraudsterResponse.fromResponse({});
    return CCaaS_VoiceBiometricsDeleteFraudsterResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceBiometricsDeleteFraudster response message
 */
export class CCaaS_VoiceBiometricsDeleteFraudsterResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsDeleteFraudsterResponseData) {
    super("CCaaS_VoiceBiometricsDeleteFraudster");
  }

  static fromResponse(data: unknown): CCaaS_VoiceBiometricsDeleteFraudsterResponse {
    return new CCaaS_VoiceBiometricsDeleteFraudsterResponse(
      responseObject<CCaaS_VoiceBiometricsDeleteFraudsterResponseData>(data)
    );
  }
}
