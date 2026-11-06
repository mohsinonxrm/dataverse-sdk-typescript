import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_updatesequencetargetstepdata message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_updatesequencetargetstepdataRequestParameters {
  msdyn_sequencetargetstepid: string;
  msdyn_linkedactivityid?: string;
}

/**
 * msdyn_updatesequencetargetstepdata request message
 *
 * Web API Action: msdyn_updatesequencetargetstepdata
 */
export class msdyn_updatesequencetargetstepdataRequest
  extends OrganizationRequest
  implements Executable<msdyn_updatesequencetargetstepdataResponse>
{
  declare readonly Parameters: Readonly<msdyn_updatesequencetargetstepdataRequestParameters>;

  constructor(parameters: msdyn_updatesequencetargetstepdataRequestParameters) {
    super("msdyn_updatesequencetargetstepdata", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updatesequencetargetstepdata`;

    const body = requestBody({
      msdyn_sequencetargetstepid: this.Parameters.msdyn_sequencetargetstepid,
      msdyn_linkedactivityid: this.Parameters.msdyn_linkedactivityid,
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

  async parseResponse(response: Response): Promise<msdyn_updatesequencetargetstepdataResponse> {
    // No return value (204 No Content)
    return new msdyn_updatesequencetargetstepdataResponse();
  }
}

/**
 * msdyn_updatesequencetargetstepdata response message
 */
export class msdyn_updatesequencetargetstepdataResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_updatesequencetargetstepdata");
  }

  static fromResponse(_data: unknown): msdyn_updatesequencetargetstepdataResponse {
    return new msdyn_updatesequencetargetstepdataResponse();
  }
}
