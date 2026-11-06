import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceprintCustomerProfileDelete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintCustomerProfileDeleteRequestParameters {
  AuthenticationProfileId: string;
  CorrelationId?: string;
  SessionId?: string;
}

/**
 * CCaaS_VoiceprintCustomerProfileDelete request message
 *
 * Web API Action: CCaaS_VoiceprintCustomerProfileDelete
 */
export class CCaaS_VoiceprintCustomerProfileDeleteRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceprintCustomerProfileDeleteResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceprintCustomerProfileDeleteRequestParameters>;

  constructor(parameters: CCaaS_VoiceprintCustomerProfileDeleteRequestParameters) {
    super("CCaaS_VoiceprintCustomerProfileDelete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceprintCustomerProfileDelete`;

    const body = requestBody({
      AuthenticationProfileId: this.Parameters.AuthenticationProfileId,
      CorrelationId: this.Parameters.CorrelationId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceprintCustomerProfileDeleteResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceprintCustomerProfileDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceprintCustomerProfileDelete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceprintCustomerProfileDeleteResult {
  "@odata.context"?: string;
  AffectedCount: number;
  ErrorMessage: string;
  StatusCode: string;
}

/**
 * CCaaS_VoiceprintCustomerProfileDelete response message
 *
 * `result` is the value the CCaaS_VoiceprintCustomerProfileDelete action returns (see {@link CCaaS_VoiceprintCustomerProfileDeleteResult}).
 */
export class CCaaS_VoiceprintCustomerProfileDeleteResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceprintCustomerProfileDeleteResult) {
    super("CCaaS_VoiceprintCustomerProfileDelete");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceprintCustomerProfileDeleteResponse {
    return new CCaaS_VoiceprintCustomerProfileDeleteResponse(
      data as CCaaS_VoiceprintCustomerProfileDeleteResult
    );
  }
}
