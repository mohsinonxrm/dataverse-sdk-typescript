import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AnalyzeServiceHealthAsync request message
 *
 * Web API Action: msdyn_AnalyzeServiceHealthAsync
 */
export class msdyn_AnalyzeServiceHealthAsyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_AnalyzeServiceHealthAsyncResponse>
{
  constructor() {
    super("msdyn_AnalyzeServiceHealthAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyzeServiceHealthAsync`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AnalyzeServiceHealthAsyncResponse> {
    // No return value (204 No Content)
    return new msdyn_AnalyzeServiceHealthAsyncResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_AnalyzeServiceHealthAsync response message
 */
export class msdyn_AnalyzeServiceHealthAsyncResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AnalyzeServiceHealthAsync");
  }

  static fromResponse(_data: unknown): msdyn_AnalyzeServiceHealthAsyncResponse {
    return new msdyn_AnalyzeServiceHealthAsyncResponse();
  }
}
