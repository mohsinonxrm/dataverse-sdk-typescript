import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal request message
 *
 * Web API Action: msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal
 */
export class msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalRequest
  extends OrganizationRequest
  implements
    Executable<msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse>
{
  constructor(public tenantId: string) {
    super("msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal");
  }

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
    return new msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse();
  }
}

/**
 * msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal response message
 */
export class msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal");
  }

  static fromResponse(
    _data: unknown
  ): msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse {
    return new msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse();
  }
}
