import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_VoiceprintCustomerConsentUpdate action
 */
export interface CCaaS_VoiceprintCustomerConsentUpdateResponse {
  ConsentStatus: number;
  ErrorMessage: string;
  Locked: boolean;
  StatusCode: string;
}

/**
 * Parameters of the CCaaS_VoiceprintCustomerConsentUpdate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintCustomerConsentUpdateActionParameters {
  CorrelationId?: string;
  Locked?: boolean;
  ConsentStatus?: number;
  OptOutReason?: string;
  SessionId?: string;
}

/**
 * CCaaS_VoiceprintCustomerConsentUpdate action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_authentication_profile)
 *
 * The first argument is the id of the msdyn_authentication_profile record to call it on.
 */
export class CCaaS_VoiceprintCustomerConsentUpdateAction implements Executable<CCaaS_VoiceprintCustomerConsentUpdateResponse> {
  constructor(
    public readonly msdyn_authentication_profileId: string,
    public readonly parameters: CCaaS_VoiceprintCustomerConsentUpdateActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_authentication_profiles(${this.msdyn_authentication_profileId})/Microsoft.Dynamics.CRM.CCaaS_VoiceprintCustomerConsentUpdate`;

    const body = requestBody({
      CorrelationId: this.parameters.CorrelationId,
      Locked: this.parameters.Locked,
      ConsentStatus: this.parameters.ConsentStatus,
      OptOutReason: this.parameters.OptOutReason,
      SessionId: this.parameters.SessionId,
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
    if (response.status === 204) return {} as CCaaS_VoiceprintCustomerConsentUpdateResponse;
    return (await response.json()) as CCaaS_VoiceprintCustomerConsentUpdateResponse;
  }
}
