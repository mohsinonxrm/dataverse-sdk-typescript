import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { AnalyzeResponse as AnalyzeResponseData } from "./types/index.js";

/**
 * Analyze request message
 *
 * Web API Action: Analyze
 */
export class AnalyzeRequest extends OrganizationRequest implements Executable<AnalyzeResponse> {
  constructor(
    public msdyn_pminferredtaskId: string,
    public version: string
  ) {
    super("Analyze");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pminferredtasks(${this.msdyn_pminferredtaskId})/Microsoft.Dynamics.CRM.Analyze`;

    const body: Record<string, unknown> = {
      version: this.version,
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

  async parseResponse(response: Response): Promise<AnalyzeResponse> {
    const data = await response.json();
    return AnalyzeResponse.fromResponse(data);
  }
}

/**
 * Analyze response message
 */
export class AnalyzeResponse extends OrganizationResponse {
  constructor(public result: AnalyzeResponseData) {
    super("Analyze");
  }

  static fromResponse(data: unknown): AnalyzeResponse {
    return new AnalyzeResponse(responseObject<AnalyzeResponseData>(data));
  }
}
