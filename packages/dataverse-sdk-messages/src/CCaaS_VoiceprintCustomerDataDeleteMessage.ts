import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceprintCustomerDataDelete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintCustomerDataDeleteRequestParameters {
  CorrelationId?: string;
  AuthenticationProfileId: string;
  SessionId?: string;
}

/**
 * CCaaS_VoiceprintCustomerDataDelete request message
 *
 * Web API Action: CCaaS_VoiceprintCustomerDataDelete
 */
export class CCaaS_VoiceprintCustomerDataDeleteRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceprintCustomerDataDeleteResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceprintCustomerDataDeleteRequestParameters>;

  constructor(parameters: CCaaS_VoiceprintCustomerDataDeleteRequestParameters) {
    super("CCaaS_VoiceprintCustomerDataDelete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceprintCustomerDataDelete`;

    const body = requestBody({
      CorrelationId: this.Parameters.CorrelationId,
      AuthenticationProfileId: this.Parameters.AuthenticationProfileId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceprintCustomerDataDeleteResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceprintCustomerDataDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceprintCustomerDataDelete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceprintCustomerDataDeleteResult {
  "@odata.context"?: string;
  AffectedCount: number;
  ErrorMessage: string;
  StatusCode: string;
}

/**
 * CCaaS_VoiceprintCustomerDataDelete response message
 *
 * `result` is the value the CCaaS_VoiceprintCustomerDataDelete action returns (see {@link CCaaS_VoiceprintCustomerDataDeleteResult}).
 */
export class CCaaS_VoiceprintCustomerDataDeleteResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceprintCustomerDataDeleteResult) {
    super("CCaaS_VoiceprintCustomerDataDelete");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceprintCustomerDataDeleteResponse {
    return new CCaaS_VoiceprintCustomerDataDeleteResponse(
      data as CCaaS_VoiceprintCustomerDataDeleteResult
    );
  }
}
