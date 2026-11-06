import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InitEntityRouting message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitEntityRoutingRequestParameters {
  AppInsightsAdditionalInformation?: string;
  IntentId?: string;
  EntityLogicalName: string;
  AppInsightsEnvInformation?: string;
  IntentFamilyId?: string;
  IntentString?: string;
  IntentGroupId?: string;
  LiveWorkStreamId: string;
  EntityRecordId: string;
}

/**
 * msdyn_InitEntityRouting request message
 *
 * Web API Action: msdyn_InitEntityRouting
 */
export class msdyn_InitEntityRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitEntityRoutingResponse>
{
  declare readonly Parameters: Readonly<msdyn_InitEntityRoutingRequestParameters>;

  constructor(parameters: msdyn_InitEntityRoutingRequestParameters) {
    super("msdyn_InitEntityRouting", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitEntityRouting`;

    const body = requestBody({
      AppInsightsAdditionalInformation: this.Parameters.AppInsightsAdditionalInformation,
      IntentId: this.Parameters.IntentId,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      AppInsightsEnvInformation: this.Parameters.AppInsightsEnvInformation,
      IntentFamilyId: this.Parameters.IntentFamilyId,
      IntentString: this.Parameters.IntentString,
      IntentGroupId: this.Parameters.IntentGroupId,
      LiveWorkStreamId: this.Parameters.LiveWorkStreamId,
      EntityRecordId: this.Parameters.EntityRecordId,
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

  async parseResponse(response: Response): Promise<msdyn_InitEntityRoutingResponse> {
    // No return value (204 No Content)
    return new msdyn_InitEntityRoutingResponse();
  }
}

/**
 * msdyn_InitEntityRouting response message
 */
export class msdyn_InitEntityRoutingResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_InitEntityRouting");
  }

  static fromResponse(_data: unknown): msdyn_InitEntityRoutingResponse {
    return new msdyn_InitEntityRoutingResponse();
  }
}
