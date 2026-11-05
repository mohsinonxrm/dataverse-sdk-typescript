import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_startSequenceStatsCopyJob request message
 *
 * Web API Action: msdyn_startSequenceStatsCopyJob
 */
export class msdyn_startSequenceStatsCopyJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_startSequenceStatsCopyJobResponse>
{
  constructor(public inputData: string) {
    super("msdyn_startSequenceStatsCopyJob");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_startSequenceStatsCopyJob`;

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

  async parseResponse(response: Response): Promise<msdyn_startSequenceStatsCopyJobResponse> {
    // No return value (204 No Content)
    return new msdyn_startSequenceStatsCopyJobResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_startSequenceStatsCopyJob response message
 */
export class msdyn_startSequenceStatsCopyJobResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_startSequenceStatsCopyJob");
  }

  static fromResponse(_data: unknown): msdyn_startSequenceStatsCopyJobResponse {
    return new msdyn_startSequenceStatsCopyJobResponse();
  }
}
