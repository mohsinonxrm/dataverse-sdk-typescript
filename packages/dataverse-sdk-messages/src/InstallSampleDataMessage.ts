import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * InstallSampleData request message
 *
 * Web API Action: InstallSampleData
 */
export class InstallSampleDataRequest
  extends OrganizationRequest
  implements Executable<InstallSampleDataResponse>
{
  constructor() {
    super("InstallSampleData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstallSampleData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<InstallSampleDataResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new InstallSampleDataResponse());
  }
}

/**
 * InstallSampleData response message
 */
export class InstallSampleDataResponse extends OrganizationResponse {
  constructor() {
    super("InstallSampleData");
  }

  static fromResponse(_data?: unknown): InstallSampleDataResponse {
    return new InstallSampleDataResponse();
  }
}
