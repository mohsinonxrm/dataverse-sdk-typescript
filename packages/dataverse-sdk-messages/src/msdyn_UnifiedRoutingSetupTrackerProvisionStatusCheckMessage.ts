import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse as msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequestParameters {
  HasTimedOut: boolean;
}

/**
 * msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck request message
 *
 * Web API Action: msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck
 */
export class msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequest
  extends OrganizationRequest
  implements Executable<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse>
{
  declare readonly Parameters: Readonly<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequestParameters>;

  constructor(parameters: msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequestParameters) {
    super("msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck`;

    const body = requestBody({
      HasTimedOut: this.Parameters.HasTimedOut,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse.fromResponse({});
    return msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck response message
 */
export class msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse extends OrganizationResponse {
  constructor(public result: msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponseData) {
    super("msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheck");
  }

  static fromResponse(data: unknown): msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse {
    return new msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse(
      responseObject<msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponseData>(data)
    );
  }
}
