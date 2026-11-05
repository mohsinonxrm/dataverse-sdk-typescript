import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_InitEntityRouting request message
 *
 * Web API Action: msdyn_InitEntityRouting
 */
export class msdyn_InitEntityRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitEntityRoutingResponse>
{
  constructor(
    public intentFamilyId: string,
    public appInsightsEnvInformation: string,
    public intentId: string,
    public liveWorkStreamId: string,
    public appInsightsAdditionalInformation: string,
    public entityLogicalName: string,
    public intentString: string,
    public intentGroupId: string,
    public entityRecordId: string
  ) {
    super("msdyn_InitEntityRouting");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitEntityRouting`;

    const body: Record<string, unknown> = {
      IntentFamilyId: this.intentFamilyId,
      AppInsightsEnvInformation: this.appInsightsEnvInformation,
      IntentId: this.intentId,
      LiveWorkStreamId: this.liveWorkStreamId,
      AppInsightsAdditionalInformation: this.appInsightsAdditionalInformation,
      EntityLogicalName: this.entityLogicalName,
      IntentString: this.intentString,
      IntentGroupId: this.intentGroupId,
      EntityRecordId: this.entityRecordId,
    };

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

  toRequestBody(): Record<string, unknown> {
    return {
      IntentFamilyId: this.intentFamilyId,
      AppInsightsEnvInformation: this.appInsightsEnvInformation,
      IntentId: this.intentId,
      LiveWorkStreamId: this.liveWorkStreamId,
      AppInsightsAdditionalInformation: this.appInsightsAdditionalInformation,
      EntityLogicalName: this.entityLogicalName,
      IntentString: this.intentString,
      IntentGroupId: this.intentGroupId,
      EntityRecordId: this.entityRecordId,
    };
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
