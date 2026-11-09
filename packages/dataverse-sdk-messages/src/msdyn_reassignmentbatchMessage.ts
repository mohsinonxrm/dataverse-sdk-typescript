import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_reassignmentbatch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_reassignmentbatchRequestParameters {
  InputData: string;
}

/**
 * msdyn_reassignmentbatch request message
 *
 * Web API Action: msdyn_reassignmentbatch
 */
export class msdyn_reassignmentbatchRequest
  extends OrganizationRequest
  implements Executable<msdyn_reassignmentbatchResponse>
{
  declare readonly Parameters: Readonly<msdyn_reassignmentbatchRequestParameters>;

  constructor(parameters: msdyn_reassignmentbatchRequestParameters) {
    super("msdyn_reassignmentbatch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_reassignmentbatch`;

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

  parseResponse(_response: Response): Promise<msdyn_reassignmentbatchResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_reassignmentbatchResponse());
  }
}

/**
 * msdyn_reassignmentbatch response message
 */
export class msdyn_reassignmentbatchResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_reassignmentbatch");
  }

  static fromResponse(_data?: unknown): msdyn_reassignmentbatchResponse {
    return new msdyn_reassignmentbatchResponse();
  }
}
