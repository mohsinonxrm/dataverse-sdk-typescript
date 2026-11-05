import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal action
 */
export interface msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse {
  // No content returned
}

/**
 * msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal action
 *
 * Unbound action
 */
export class msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalAction implements Executable<msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse> {
  constructor(public readonly tenantId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal`;

    const body: Record<string, unknown> = {
      TenantId: this.tenantId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse> {
    // No return value (204 No Content)
    return {};
  }
}
