import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DeprecateODOS message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DeprecateODOSRequestParameters {
  InputData: string;
}

/**
 * msdyn_DeprecateODOS request message
 *
 * Web API Action: msdyn_DeprecateODOS
 */
export class msdyn_DeprecateODOSRequest
  extends OrganizationRequest
  implements Executable<msdyn_DeprecateODOSResponse>
{
  declare readonly Parameters: Readonly<msdyn_DeprecateODOSRequestParameters>;

  constructor(parameters: msdyn_DeprecateODOSRequestParameters) {
    super("msdyn_DeprecateODOS", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeprecateODOS`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_DeprecateODOSResponse> {
    // No return value (204 No Content)
    return new msdyn_DeprecateODOSResponse();
  }
}

/**
 * msdyn_DeprecateODOS response message
 */
export class msdyn_DeprecateODOSResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DeprecateODOS");
  }

  static fromResponse(_data: unknown): msdyn_DeprecateODOSResponse {
    return new msdyn_DeprecateODOSResponse();
  }
}
