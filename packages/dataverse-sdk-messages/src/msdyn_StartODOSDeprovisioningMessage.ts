import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_StartODOSDeprovisioning request message
 *
 * Web API Action: msdyn_StartODOSDeprovisioning
 */
export class msdyn_StartODOSDeprovisioningRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartODOSDeprovisioningResponse>
{
  constructor(
    public featureName: string,
    public isDeprecationDeprovisioning: boolean
  ) {
    super("msdyn_StartODOSDeprovisioning");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartODOSDeprovisioning`;

    const body: Record<string, unknown> = {
      FeatureName: this.featureName,
      IsDeprecationDeprovisioning: this.isDeprecationDeprovisioning,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_StartODOSDeprovisioningResponse> {
    // No return value (204 No Content)
    return new msdyn_StartODOSDeprovisioningResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FeatureName: this.featureName,
      IsDeprecationDeprovisioning: this.isDeprecationDeprovisioning,
    };
  }
}

/**
 * msdyn_StartODOSDeprovisioning response message
 */
export class msdyn_StartODOSDeprovisioningResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_StartODOSDeprovisioning");
  }

  static fromResponse(_data: unknown): msdyn_StartODOSDeprovisioningResponse {
    return new msdyn_StartODOSDeprovisioningResponse();
  }
}
