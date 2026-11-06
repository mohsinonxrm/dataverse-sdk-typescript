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
  IntentFamilyId?: string;
  AppInsightsEnvInformation?: string;
  IntentId?: string;
  LiveWorkStreamId: string;
  AppInsightsAdditionalInformation?: string;
  EntityLogicalName: string;
  IntentString?: string;
  IntentGroupId?: string;
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
      IntentFamilyId: this.parameters.IntentFamilyId,
      AppInsightsEnvInformation: this.parameters.AppInsightsEnvInformation,
      IntentId: this.parameters.IntentId,
      LiveWorkStreamId: this.parameters.LiveWorkStreamId,
      AppInsightsAdditionalInformation: this.parameters.AppInsightsAdditionalInformation,
      EntityLogicalName: this.parameters.EntityLogicalName,
      IntentString: this.parameters.IntentString,
      IntentGroupId: this.parameters.IntentGroupId,
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
