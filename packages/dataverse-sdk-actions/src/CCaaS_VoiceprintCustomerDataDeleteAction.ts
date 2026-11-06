import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_VoiceprintCustomerDataDelete action
 */
export interface CCaaS_VoiceprintCustomerDataDeleteResponse {
  AffectedCount: number;
  ErrorMessage: string;
  StatusCode: string;
}

/**
 * Parameters of the CCaaS_VoiceprintCustomerDataDelete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintCustomerDataDeleteActionParameters {
  CorrelationId?: string;
  AuthenticationProfileId: string;
  SessionId?: string;
}

/**
 * CCaaS_VoiceprintCustomerDataDelete action
 *
 * Unbound action
 */
export class CCaaS_VoiceprintCustomerDataDeleteAction implements Executable<CCaaS_VoiceprintCustomerDataDeleteResponse> {
  constructor(public readonly parameters: CCaaS_VoiceprintCustomerDataDeleteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceprintCustomerDataDelete`;

    const body = requestBody({
      CorrelationId: this.parameters.CorrelationId,
      AuthenticationProfileId: this.parameters.AuthenticationProfileId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceprintCustomerDataDeleteResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_VoiceprintCustomerDataDeleteResponse;
    return (await response.json()) as CCaaS_VoiceprintCustomerDataDeleteResponse;
  }
}
