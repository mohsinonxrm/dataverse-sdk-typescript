import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceprintEnrollmentAudioDeleteResponse as CCaaS_VoiceprintEnrollmentAudioDeleteResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_VoiceprintEnrollmentAudioDelete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintEnrollmentAudioDeleteRequestParameters {
  SegmentIds?: string[];
  SessionId?: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceprintEnrollmentAudioDelete request message
 *
 * Web API Action: CCaaS_VoiceprintEnrollmentAudioDelete
 *
 * The first argument is the id of the msdyn_authentication_profile record to call it on.
 */
export class CCaaS_VoiceprintEnrollmentAudioDeleteRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceprintEnrollmentAudioDeleteResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceprintEnrollmentAudioDeleteRequestParameters>;

  constructor(
    public msdyn_authentication_profileId: string,
    parameters: CCaaS_VoiceprintEnrollmentAudioDeleteRequestParameters = {}
  ) {
    super("CCaaS_VoiceprintEnrollmentAudioDelete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_authentication_profiles(${this.msdyn_authentication_profileId})/Microsoft.Dynamics.CRM.CCaaS_VoiceprintEnrollmentAudioDelete`;

    const body = requestBody({
      SegmentIds: this.Parameters.SegmentIds,
      SessionId: this.Parameters.SessionId,
      CorrelationId: this.Parameters.CorrelationId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceprintEnrollmentAudioDeleteResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_VoiceprintEnrollmentAudioDeleteResponse.fromResponse({});
    return CCaaS_VoiceprintEnrollmentAudioDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceprintEnrollmentAudioDelete response message
 */
export class CCaaS_VoiceprintEnrollmentAudioDeleteResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceprintEnrollmentAudioDeleteResponseData) {
    super("CCaaS_VoiceprintEnrollmentAudioDelete");
  }

  static fromResponse(data: unknown): CCaaS_VoiceprintEnrollmentAudioDeleteResponse {
    return new CCaaS_VoiceprintEnrollmentAudioDeleteResponse(
      responseObject<CCaaS_VoiceprintEnrollmentAudioDeleteResponseData>(data)
    );
  }
}
