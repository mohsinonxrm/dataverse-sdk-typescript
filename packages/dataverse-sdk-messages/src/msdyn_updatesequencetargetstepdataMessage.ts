import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_updatesequencetargetstepdata request message
 *
 * Web API Action: msdyn_updatesequencetargetstepdata
 */
export class msdyn_updatesequencetargetstepdataRequest
  extends OrganizationRequest
  implements Executable<msdyn_updatesequencetargetstepdataResponse>
{
  constructor(
    public msdyn_sequencetargetstepid: string,
    public msdyn_linkedactivityid: string
  ) {
    super("msdyn_updatesequencetargetstepdata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updatesequencetargetstepdata`;

    const body: Record<string, unknown> = {
      msdyn_sequencetargetstepid: this.msdyn_sequencetargetstepid,
      msdyn_linkedactivityid: this.msdyn_linkedactivityid,
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
