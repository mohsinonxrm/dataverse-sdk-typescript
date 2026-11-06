import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_VoiceprintCustomerProfileDelete action
 */
export interface CCaaS_VoiceprintCustomerProfileDeleteResponse {
  AffectedCount: number;
  ErrorMessage: string;
  StatusCode: string;
}

/**
 * Parameters of the CCaaS_VoiceprintCustomerProfileDelete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintCustomerProfileDeleteActionParameters {
  AuthenticationProfileId: string;
  CorrelationId?: string;
  SessionId?: string;
}

/**
 * CCaaS_VoiceprintCustomerProfileDelete action
 *
 * Unbound action
 */
export class CCaaS_VoiceprintCustomerProfileDeleteAction implements Executable<CCaaS_VoiceprintCustomerProfileDeleteResponse> {
  constructor(public readonly parameters: CCaaS_VoiceprintCustomerProfileDeleteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceprintCustomerProfileDelete`;

    const body = requestBody({
      AuthenticationProfileId: this.parameters.AuthenticationProfileId,
      CorrelationId: this.parameters.CorrelationId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceprintCustomerProfileDeleteResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_VoiceprintCustomerProfileDeleteResponse;
    return (await response.json()) as CCaaS_VoiceprintCustomerProfileDeleteResponse;
  }
}
