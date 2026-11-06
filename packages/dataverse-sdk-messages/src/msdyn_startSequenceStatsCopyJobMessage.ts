import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_startSequenceStatsCopyJob message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_startSequenceStatsCopyJobRequestParameters {
  InputData?: string;
}

/**
 * msdyn_startSequenceStatsCopyJob request message
 *
 * Web API Action: msdyn_startSequenceStatsCopyJob
 */
export class msdyn_startSequenceStatsCopyJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_startSequenceStatsCopyJobResponse>
{
  declare readonly Parameters: Readonly<msdyn_startSequenceStatsCopyJobRequestParameters>;

  constructor(parameters: msdyn_startSequenceStatsCopyJobRequestParameters = {}) {
    super("msdyn_startSequenceStatsCopyJob", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_startSequenceStatsCopyJob`;

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

  parseResponse(_response: Response): Promise<msdyn_startSequenceStatsCopyJobResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_startSequenceStatsCopyJobResponse());
  }
}

/**
 * msdyn_startSequenceStatsCopyJob response message
 */
export class msdyn_startSequenceStatsCopyJobResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_startSequenceStatsCopyJob");
  }

  static fromResponse(_data?: unknown): msdyn_startSequenceStatsCopyJobResponse {
    return new msdyn_startSequenceStatsCopyJobResponse();
  }
}
