import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_VoiceprintEnrollmentAudioDelete action
 */
export interface CCaaS_VoiceprintEnrollmentAudioDeleteResponse {
  AffectedCount: number;
  ErrorMessage: string;
  StatusCode: string;
}

/**
 * Parameters of the CCaaS_VoiceprintEnrollmentAudioDelete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintEnrollmentAudioDeleteActionParameters {
  SegmentIds?: string[];
  SessionId?: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceprintEnrollmentAudioDelete action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_authentication_profile)
 *
 * The first argument is the id of the msdyn_authentication_profile record to call it on.
 */
export class CCaaS_VoiceprintEnrollmentAudioDeleteAction implements Executable<CCaaS_VoiceprintEnrollmentAudioDeleteResponse> {
  constructor(
    public readonly msdyn_authentication_profileId: string,
    public readonly parameters: CCaaS_VoiceprintEnrollmentAudioDeleteActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_authentication_profiles(${this.msdyn_authentication_profileId})/Microsoft.Dynamics.CRM.CCaaS_VoiceprintEnrollmentAudioDelete`;

    const body = requestBody({
      SegmentIds: this.parameters.SegmentIds,
      SessionId: this.parameters.SessionId,
      CorrelationId: this.parameters.CorrelationId,
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
    if (response.status === 204) return {} as CCaaS_VoiceprintEnrollmentAudioDeleteResponse;
    return (await response.json()) as CCaaS_VoiceprintEnrollmentAudioDeleteResponse;
  }
}
