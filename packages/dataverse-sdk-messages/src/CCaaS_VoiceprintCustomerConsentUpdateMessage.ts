import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceprintCustomerConsentUpdateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceprintCustomerConsentUpdate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceprintCustomerConsentUpdateResult {
  "@odata.context"?: string;
  ConsentStatus: number;
  ErrorMessage: string;
  Locked: boolean;
  StatusCode: string;
}

/**
 * CCaaS_VoiceprintCustomerConsentUpdate response message
 *
 * `result` is the value the CCaaS_VoiceprintCustomerConsentUpdate action returns (see {@link CCaaS_VoiceprintCustomerConsentUpdateResult}).
 */
export class CCaaS_VoiceprintCustomerConsentUpdateResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceprintCustomerConsentUpdateResult) {
    super("CCaaS_VoiceprintCustomerConsentUpdate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceprintCustomerConsentUpdateResponse {
    return new CCaaS_VoiceprintCustomerConsentUpdateResponse(
      data as CCaaS_VoiceprintCustomerConsentUpdateResult
    );
  }
}
