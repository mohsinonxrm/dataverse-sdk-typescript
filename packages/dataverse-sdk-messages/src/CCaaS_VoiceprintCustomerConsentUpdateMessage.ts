import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceprintCustomerConsentUpdateResponse as CCaaS_VoiceprintCustomerConsentUpdateResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_VoiceprintCustomerConsentUpdate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintCustomerConsentUpdateRequestParameters {
  CorrelationId?: string;
  Locked?: boolean;
  ConsentStatus?: number;
  OptOutReason?: string;
  SessionId?: string;
}

/**
 * CCaaS_VoiceprintCustomerConsentUpdate request message
 *
 * Web API Action: CCaaS_VoiceprintCustomerConsentUpdate
 *
 * The first argument is the id of the msdyn_authentication_profile record to call it on.
 */
export class CCaaS_VoiceprintCustomerConsentUpdateRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceprintCustomerConsentUpdateResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceprintCustomerConsentUpdateRequestParameters>;

  constructor(
    public msdyn_authentication_profileId: string,
    parameters: CCaaS_VoiceprintCustomerConsentUpdateRequestParameters = {}
  ) {
    super("CCaaS_VoiceprintCustomerConsentUpdate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_authentication_profiles(${this.msdyn_authentication_profileId})/Microsoft.Dynamics.CRM.CCaaS_VoiceprintCustomerConsentUpdate`;

    const body = requestBody({
      CorrelationId: this.Parameters.CorrelationId,
      Locked: this.Parameters.Locked,
      ConsentStatus: this.Parameters.ConsentStatus,
      OptOutReason: this.Parameters.OptOutReason,
      SessionId: this.Parameters.SessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceprintCustomerConsentUpdateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_VoiceprintCustomerConsentUpdateResponse.fromResponse({});
    return CCaaS_VoiceprintCustomerConsentUpdateResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceprintCustomerConsentUpdate response message
 */
export class CCaaS_VoiceprintCustomerConsentUpdateResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceprintCustomerConsentUpdateResponseData) {
    super("CCaaS_VoiceprintCustomerConsentUpdate");
  }

  static fromResponse(data: unknown): CCaaS_VoiceprintCustomerConsentUpdateResponse {
    return new CCaaS_VoiceprintCustomerConsentUpdateResponse(
      responseObject<CCaaS_VoiceprintCustomerConsentUpdateResponseData>(data)
    );
  }
}
