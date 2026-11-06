import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_StartODOSDeprovisioning message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartODOSDeprovisioningRequestParameters {
  FeatureName: string;
  IsDeprecationDeprovisioning?: boolean;
}

/**
 * msdyn_StartODOSDeprovisioning request message
 *
 * Web API Action: msdyn_StartODOSDeprovisioning
 */
export class msdyn_StartODOSDeprovisioningRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartODOSDeprovisioningResponse>
{
  declare readonly Parameters: Readonly<msdyn_StartODOSDeprovisioningRequestParameters>;

  constructor(parameters: msdyn_StartODOSDeprovisioningRequestParameters) {
    super("msdyn_StartODOSDeprovisioning", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartODOSDeprovisioning`;

    const body = requestBody({
      FeatureName: this.Parameters.FeatureName,
      IsDeprecationDeprovisioning: this.Parameters.IsDeprecationDeprovisioning,
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

  async parseResponse(response: Response): Promise<msdyn_StartODOSDeprovisioningResponse> {
    // No return value (204 No Content)
    return new msdyn_StartODOSDeprovisioningResponse();
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
