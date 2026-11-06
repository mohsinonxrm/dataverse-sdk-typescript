import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UninstallSampleData request message
 *
 * Web API Action: UninstallSampleData
 */
export class UninstallSampleDataRequest
  extends OrganizationRequest
  implements Executable<UninstallSampleDataResponse>
{
  constructor() {
    super("UninstallSampleData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSampleData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<UninstallSampleDataResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UninstallSampleDataResponse());
  }
}

/**
 * UninstallSampleData response message
 */
export class UninstallSampleDataResponse extends OrganizationResponse {
  constructor() {
    super("UninstallSampleData");
  }

  static fromResponse(_data?: unknown): UninstallSampleDataResponse {
    return new UninstallSampleDataResponse();
  }
}
