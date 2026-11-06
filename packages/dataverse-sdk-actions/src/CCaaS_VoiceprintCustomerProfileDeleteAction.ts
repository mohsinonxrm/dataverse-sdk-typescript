import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_VoiceprintCustomerProfileDelete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceprintCustomerProfileDeleteResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_VoiceprintCustomerProfileDeleteResponse;
  }
}
