import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DeprecateODOS request message
 *
 * Web API Action: msdyn_DeprecateODOS
 */
export class msdyn_DeprecateODOSRequest
  extends OrganizationRequest
  implements Executable<msdyn_DeprecateODOSResponse>
{
  constructor(public inputData: string) {
    super("msdyn_DeprecateODOS");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeprecateODOS`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_DeprecateODOSResponse> {
    // No return value (204 No Content)
    return new msdyn_DeprecateODOSResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
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
