import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InitEntityRouting action
 */
export interface msdyn_InitEntityRoutingResponse {
  // No content returned
}

/**
 * msdyn_InitEntityRouting action
 *
 * Unbound action
 */
export class msdyn_InitEntityRoutingAction implements Executable<msdyn_InitEntityRoutingResponse> {
  constructor(
    public readonly intentFamilyId: string | undefined,
    public readonly appInsightsEnvInformation: string | undefined,
    public readonly intentId: string | undefined,
    public readonly liveWorkStreamId: string,
    public readonly appInsightsAdditionalInformation: string | undefined,
    public readonly entityLogicalName: string,
    public readonly intentString: string | undefined,
    public readonly intentGroupId: string | undefined,
    public readonly entityRecordId: string
  ) {}

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
    return {};
  }
}
