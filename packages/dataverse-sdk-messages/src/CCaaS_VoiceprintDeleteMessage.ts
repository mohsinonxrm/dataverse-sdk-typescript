import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceprintDelete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceprintDeleteRequestParameters {
  CorrelationId?: string;
  SessionId?: string;
}

/**
 * CCaaS_VoiceprintDelete request message
 *
 * Web API Action: CCaaS_VoiceprintDelete
 *
 * The first argument is the id of the msdyn_authentication_profile record to call it on.
 */
export class CCaaS_VoiceprintDeleteRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceprintDeleteResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceprintDeleteRequestParameters>;

  constructor(
    public msdyn_authentication_profileId: string,
    parameters: CCaaS_VoiceprintDeleteRequestParameters = {}
  ) {
    super("CCaaS_VoiceprintDelete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_authentication_profiles(${this.msdyn_authentication_profileId})/Microsoft.Dynamics.CRM.CCaaS_VoiceprintDelete`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceprintDeleteResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceprintDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceprintDelete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceprintDeleteResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  StatusCode: string;
}

/**
 * CCaaS_VoiceprintDelete response message
 *
 * `result` is the value the CCaaS_VoiceprintDelete action returns (see {@link CCaaS_VoiceprintDeleteResult}).
 */
export class CCaaS_VoiceprintDeleteResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceprintDeleteResult) {
    super("CCaaS_VoiceprintDelete");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceprintDeleteResponse {
    return new CCaaS_VoiceprintDeleteResponse(data as CCaaS_VoiceprintDeleteResult);
  }
}
