import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_StartODOSProvisioning message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartODOSProvisioningRequestParameters {
  Entities: string;
  FeatureName: string;
  FeatureDisplayName: string;
  Roles: string;
  Primitives: string;
}

/**
 * msdyn_StartODOSProvisioning request message
 *
 * Web API Action: msdyn_StartODOSProvisioning
 */
export class msdyn_StartODOSProvisioningRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartODOSProvisioningResponse>
{
  declare readonly Parameters: Readonly<msdyn_StartODOSProvisioningRequestParameters>;

  constructor(parameters: msdyn_StartODOSProvisioningRequestParameters) {
    super("msdyn_StartODOSProvisioning", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartODOSProvisioning`;

    const body = requestBody({
      Entities: this.Parameters.Entities,
      FeatureName: this.Parameters.FeatureName,
      FeatureDisplayName: this.Parameters.FeatureDisplayName,
      Roles: this.Parameters.Roles,
      Primitives: this.Parameters.Primitives,
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

  async parseResponse(response: Response): Promise<msdyn_StartODOSProvisioningResponse> {
    // No return value (204 No Content)
    return new msdyn_StartODOSProvisioningResponse();
  }
}

/**
 * msdyn_StartODOSProvisioning response message
 */
export class msdyn_StartODOSProvisioningResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_StartODOSProvisioning");
  }

  static fromResponse(_data: unknown): msdyn_StartODOSProvisioningResponse {
    return new msdyn_StartODOSProvisioningResponse();
  }
}
