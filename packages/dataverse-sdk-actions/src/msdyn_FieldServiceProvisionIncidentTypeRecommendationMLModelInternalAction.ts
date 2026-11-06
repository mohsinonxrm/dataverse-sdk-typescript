import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal action
 */
export interface msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalActionParameters {
  TenantId: string;
}

/**
 * msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal action
 *
 * Unbound action
 */
export class msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalAction implements Executable<msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse> {
  constructor(
    public readonly parameters: msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal`;

    const body = requestBody({
      TenantId: this.parameters.TenantId,
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
  ): Promise<msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse;
    return (await response.json()) as msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse;
  }
}
