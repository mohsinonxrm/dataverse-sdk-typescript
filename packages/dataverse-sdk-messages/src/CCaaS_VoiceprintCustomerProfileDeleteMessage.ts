import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceprintCustomerProfileDeleteResponse as CCaaS_VoiceprintCustomerProfileDeleteResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_VoiceprintCustomerProfileDeleteResponse.fromResponse({});
    return CCaaS_VoiceprintCustomerProfileDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceprintCustomerProfileDelete response message
 */
export class CCaaS_VoiceprintCustomerProfileDeleteResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceprintCustomerProfileDeleteResponseData) {
    super("CCaaS_VoiceprintCustomerProfileDelete");
  }

  static fromResponse(data: unknown): CCaaS_VoiceprintCustomerProfileDeleteResponse {
    return new CCaaS_VoiceprintCustomerProfileDeleteResponse(
      responseObject<CCaaS_VoiceprintCustomerProfileDeleteResponseData>(data)
    );
  }
}
