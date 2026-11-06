import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ProvisionODOS message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProvisionODOSRequestParameters {
  Entities: string;
  FeatureName: string;
  FeatureDisplayName: string;
  Roles: string;
  Primitives: string;
}

/**
 * msdyn_ProvisionODOS request message
 *
 * Web API Action: msdyn_ProvisionODOS
 */
export class msdyn_ProvisionODOSRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionODOSResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProvisionODOSRequestParameters>;

  constructor(parameters: msdyn_ProvisionODOSRequestParameters) {
    super("msdyn_ProvisionODOS", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionODOS`;

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

  async parseResponse(response: Response): Promise<msdyn_ProvisionODOSResponse> {
    // No return value (204 No Content)
    return new msdyn_ProvisionODOSResponse();
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
