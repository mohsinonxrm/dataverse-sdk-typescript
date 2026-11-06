import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_VoiceprintDelete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceprintDeleteResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  StatusCode: string;
}

/**
 * Parameters of the CCaaS_VoiceprintDelete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintDeleteActionParameters {
  CorrelationId?: string;
  SessionId?: string;
}

/**
 * CCaaS_VoiceprintDelete action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_authentication_profile)
 *
 * The first argument is the id of the msdyn_authentication_profile record to call it on.
 */
export class CCaaS_VoiceprintDeleteAction implements Executable<CCaaS_VoiceprintDeleteResponse> {
  constructor(
    public readonly msdyn_authentication_profileId: string,
    public readonly parameters: CCaaS_VoiceprintDeleteActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_authentication_profiles(${this.msdyn_authentication_profileId})/Microsoft.Dynamics.CRM.CCaaS_VoiceprintDelete`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceprintDeleteResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_VoiceprintDeleteResponse;
  }
}
