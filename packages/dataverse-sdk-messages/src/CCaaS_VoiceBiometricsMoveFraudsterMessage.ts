import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceBiometricsMoveFraudsterResponse as CCaaS_VoiceBiometricsMoveFraudsterResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsMoveFraudster message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsMoveFraudsterRequestParameters {
  SessionId?: string;
  TargetWatchlistId: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceBiometricsMoveFraudster request message
 *
 * Web API Action: CCaaS_VoiceBiometricsMoveFraudster
 *
 * The first argument is the id of the msdyn_fraudsterdetectionvoiceprint record to call it on.
 */
export class CCaaS_VoiceBiometricsMoveFraudsterRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsMoveFraudsterResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsMoveFraudsterRequestParameters>;

  constructor(
    public msdyn_fraudsterdetectionvoiceprintId: string,
    parameters: CCaaS_VoiceBiometricsMoveFraudsterRequestParameters
  ) {
    super("CCaaS_VoiceBiometricsMoveFraudster", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudsterdetectionvoiceprints(${this.msdyn_fraudsterdetectionvoiceprintId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsMoveFraudster`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      TargetWatchlistId: this.Parameters.TargetWatchlistId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsMoveFraudsterResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_VoiceBiometricsMoveFraudsterResponse.fromResponse({});
    return CCaaS_VoiceBiometricsMoveFraudsterResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceBiometricsMoveFraudster response message
 */
export class CCaaS_VoiceBiometricsMoveFraudsterResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsMoveFraudsterResponseData) {
    super("CCaaS_VoiceBiometricsMoveFraudster");
  }

  static fromResponse(data: unknown): CCaaS_VoiceBiometricsMoveFraudsterResponse {
    return new CCaaS_VoiceBiometricsMoveFraudsterResponse(
      responseObject<CCaaS_VoiceBiometricsMoveFraudsterResponseData>(data)
    );
  }
}
