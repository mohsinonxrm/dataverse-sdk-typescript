import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ProvisionODOS request message
 *
 * Web API Action: msdyn_ProvisionODOS
 */
export class msdyn_ProvisionODOSRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionODOSResponse>
{
  constructor(
    public entities: string,
    public featureName: string,
    public featureDisplayName: string,
    public roles: string,
    public primitives: string
  ) {
    super("msdyn_ProvisionODOS");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionODOS`;

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

  async parseResponse(response: Response): Promise<msdyn_ProvisionODOSResponse> {
    // No return value (204 No Content)
    return new msdyn_ProvisionODOSResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Entities: this.entities,
      FeatureName: this.featureName,
      FeatureDisplayName: this.featureDisplayName,
      Roles: this.roles,
      Primitives: this.primitives,
    };
  }
}

/**
 * msdyn_ProvisionODOS response message
 */
export class msdyn_ProvisionODOSResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ProvisionODOS");
  }

  static fromResponse(_data: unknown): msdyn_ProvisionODOSResponse {
    return new msdyn_ProvisionODOSResponse();
  }
}
