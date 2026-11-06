import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InitEntityRouting action
 */
export interface msdyn_InitEntityRoutingResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_InitEntityRouting action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitEntityRoutingActionParameters {
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
 * msdyn_InitEntityRouting action
 *
 * Unbound action
 */
export class msdyn_InitEntityRoutingAction implements Executable<msdyn_InitEntityRoutingResponse> {
  constructor(public readonly parameters: msdyn_InitEntityRoutingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitEntityRouting`;

    const body = requestBody({
      AppInsightsAdditionalInformation: this.parameters.AppInsightsAdditionalInformation,
      IntentId: this.parameters.IntentId,
      EntityLogicalName: this.parameters.EntityLogicalName,
      AppInsightsEnvInformation: this.parameters.AppInsightsEnvInformation,
      IntentFamilyId: this.parameters.IntentFamilyId,
      IntentString: this.parameters.IntentString,
      IntentGroupId: this.parameters.IntentGroupId,
      LiveWorkStreamId: this.parameters.LiveWorkStreamId,
      EntityRecordId: this.parameters.EntityRecordId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InitEntityRoutingResponse;
    return (await response.json()) as msdyn_InitEntityRoutingResponse;
  }
}
