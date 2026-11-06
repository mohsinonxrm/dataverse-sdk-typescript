import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_AnalyzeServiceHealthResponse as msdyn_AnalyzeServiceHealthResponseData } from "./types/index.js";

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
}

/**
 * msdyn_AnalyzeServiceHealth response message
 */
export class msdyn_AnalyzeServiceHealthResponse extends OrganizationResponse {
  constructor(public result: msdyn_AnalyzeServiceHealthResponseData) {
    super("msdyn_AnalyzeServiceHealth");
  }

  static fromResponse(data: unknown): msdyn_AnalyzeServiceHealthResponse {
    return new msdyn_AnalyzeServiceHealthResponse(
      responseObject<msdyn_AnalyzeServiceHealthResponseData>(data)
    );
  }
}
