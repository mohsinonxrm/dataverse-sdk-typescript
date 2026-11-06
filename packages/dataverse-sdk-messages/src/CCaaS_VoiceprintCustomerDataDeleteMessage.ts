import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceprintCustomerDataDeleteResponse as CCaaS_VoiceprintCustomerDataDeleteResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_VoiceprintCustomerDataDeleteResponse.fromResponse({});
    return CCaaS_VoiceprintCustomerDataDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceprintCustomerDataDelete response message
 */
export class CCaaS_VoiceprintCustomerDataDeleteResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceprintCustomerDataDeleteResponseData) {
    super("CCaaS_VoiceprintCustomerDataDelete");
  }

  static fromResponse(data: unknown): CCaaS_VoiceprintCustomerDataDeleteResponse {
    return new CCaaS_VoiceprintCustomerDataDeleteResponse(
      responseObject<CCaaS_VoiceprintCustomerDataDeleteResponseData>(data)
    );
  }
}
