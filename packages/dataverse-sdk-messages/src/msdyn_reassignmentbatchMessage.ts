import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_reassignmentbatch request message
 *
 * Web API Action: msdyn_reassignmentbatch
 */
export class msdyn_reassignmentbatchRequest
  extends OrganizationRequest
  implements Executable<msdyn_reassignmentbatchResponse>
{
  constructor(public inputData: string) {
    super("msdyn_reassignmentbatch");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_reassignmentbatch`;

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

  async parseResponse(response: Response): Promise<msdyn_reassignmentbatchResponse> {
    // No return value (204 No Content)
    return new msdyn_reassignmentbatchResponse();
  }
}

/**
 * msdyn_reassignmentbatch response message
 */
export class msdyn_reassignmentbatchResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_reassignmentbatch");
  }

  static fromResponse(_data: unknown): msdyn_reassignmentbatchResponse {
    return new msdyn_reassignmentbatchResponse();
  }
}
