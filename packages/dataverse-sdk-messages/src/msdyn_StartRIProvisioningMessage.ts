import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_StartRIProvisioning message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartRIProvisioningRequestParameters {
  HubName?: string;
  PrimaryKey?: string;
}

/**
 * msdyn_StartRIProvisioning request message
 *
 * Web API Action: msdyn_StartRIProvisioning
 */
export class msdyn_StartRIProvisioningRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartRIProvisioningResponse>
{
  declare readonly Parameters: Readonly<msdyn_StartRIProvisioningRequestParameters>;

  constructor(parameters: msdyn_StartRIProvisioningRequestParameters = {}) {
    super("msdyn_StartRIProvisioning", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartRIProvisioning`;

    const body = requestBody({
      HubName: this.Parameters.HubName,
      PrimaryKey: this.Parameters.PrimaryKey,
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

  async parseResponse(response: Response): Promise<msdyn_StartRIProvisioningResponse> {
    // No return value (204 No Content)
    return new msdyn_StartRIProvisioningResponse();
  }
}

/**
 * msdyn_StartRIProvisioning response message
 */
export class msdyn_StartRIProvisioningResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_StartRIProvisioning");
  }

  static fromResponse(_data: unknown): msdyn_StartRIProvisioningResponse {
    return new msdyn_StartRIProvisioningResponse();
  }
}
