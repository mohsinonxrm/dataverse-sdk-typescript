import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_StartODOSProvisioning request message
 *
 * Web API Action: msdyn_StartODOSProvisioning
 */
export class msdyn_StartODOSProvisioningRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartODOSProvisioningResponse>
{
  constructor(
    public entities: string,
    public featureName: string,
    public featureDisplayName: string,
    public roles: string,
    public primitives: string
  ) {
    super("msdyn_StartODOSProvisioning");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartODOSProvisioning`;

    const body: Record<string, unknown> = {
      Entities: this.entities,
      FeatureName: this.featureName,
      FeatureDisplayName: this.featureDisplayName,
      Roles: this.roles,
      Primitives: this.primitives,
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
