import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_reassignmentrun request message
 *
 * Web API Action: msdyn_reassignmentrun
 */
export class msdyn_reassignmentrunRequest
  extends OrganizationRequest
  implements Executable<msdyn_reassignmentrunResponse>
{
  constructor(public inputData: string) {
    super("msdyn_reassignmentrun");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_reassignmentrun`;

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

  async parseResponse(response: Response): Promise<msdyn_reassignmentrunResponse> {
    // No return value (204 No Content)
    return new msdyn_reassignmentrunResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_reassignmentrun response message
 */
export class msdyn_reassignmentrunResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_reassignmentrun");
  }

  static fromResponse(_data: unknown): msdyn_reassignmentrunResponse {
    return new msdyn_reassignmentrunResponse();
  }
}
