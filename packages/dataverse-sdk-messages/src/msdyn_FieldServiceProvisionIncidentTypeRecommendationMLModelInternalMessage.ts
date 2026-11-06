import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalRequestParameters {
  TenantId: string;
}

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
  declare readonly Parameters: Readonly<msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalRequestParameters>;

  constructor(
    parameters: msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalRequestParameters
  ) {
    super("msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal", {
      ...parameters,
    });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternal`;

    const body = requestBody({
      TenantId: this.Parameters.TenantId,
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
