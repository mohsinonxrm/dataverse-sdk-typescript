import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AnalyzeServiceHealth request message
 *
 * Web API Action: msdyn_AnalyzeServiceHealth
 */
export class msdyn_AnalyzeServiceHealthRequest
  extends OrganizationRequest
  implements Executable<msdyn_AnalyzeServiceHealthResponse>
{
  constructor() {
    super("msdyn_AnalyzeServiceHealth");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyzeServiceHealth`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AnalyzeServiceHealthResponse> {
    const data = await response.json();
    return msdyn_AnalyzeServiceHealthResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_AnalyzeServiceHealth response message
 */
export class msdyn_AnalyzeServiceHealthResponse extends OrganizationResponse {
  constructor(public result: msdyn_AnalyzeServiceHealthResponse) {
    super("msdyn_AnalyzeServiceHealth");
  }

  static fromResponse(data: unknown): msdyn_AnalyzeServiceHealthResponse {
    return new msdyn_AnalyzeServiceHealthResponse((data as any).value);
  }
}
