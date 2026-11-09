import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_reassignmentrun message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_reassignmentrunRequestParameters {
  InputData: string;
}

/**
 * msdyn_reassignmentrun request message
 *
 * Web API Action: msdyn_reassignmentrun
 */
export class msdyn_reassignmentrunRequest
  extends OrganizationRequest
  implements Executable<msdyn_reassignmentrunResponse>
{
  declare readonly Parameters: Readonly<msdyn_reassignmentrunRequestParameters>;

  constructor(parameters: msdyn_reassignmentrunRequestParameters) {
    super("msdyn_reassignmentrun", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_reassignmentrun`;

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

  parseResponse(_response: Response): Promise<msdyn_reassignmentrunResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_reassignmentrunResponse());
  }
}

/**
 * msdyn_reassignmentrun response message
 */
export class msdyn_reassignmentrunResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_reassignmentrun");
  }

  static fromResponse(_data?: unknown): msdyn_reassignmentrunResponse {
    return new msdyn_reassignmentrunResponse();
  }
}
