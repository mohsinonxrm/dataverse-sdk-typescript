import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnalyzeResponse as AnalyzeResponseData } from "./types/index.js";

/**
 * Parameters of the Analyze message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AnalyzeRequestParameters {
  version: string;
}

/**
 * Analyze request message
 *
 * Web API Action: Analyze
 *
 * The first argument is the id of the msdyn_pminferredtask record to call it on.
 */
export class AnalyzeRequest extends OrganizationRequest implements Executable<AnalyzeResponse> {
  declare readonly Parameters: Readonly<AnalyzeRequestParameters>;

  constructor(
    public msdyn_pminferredtaskId: string,
    parameters: AnalyzeRequestParameters
  ) {
    super("Analyze", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pminferredtasks(${this.msdyn_pminferredtaskId})/Microsoft.Dynamics.CRM.Analyze`;

    const body = requestBody({
      version: this.Parameters.version,
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

  async parseResponse(response: Response): Promise<AnalyzeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AnalyzeResponse.fromResponse(text ? JSON.parse(text) : {});
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
