import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return AnalyzeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Analyze action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AnalyzeResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * Analyze response message
 *
 * `result` is the value the Analyze action returns (see {@link AnalyzeResult}).
 */
export class AnalyzeResponse extends OrganizationResponse {
  constructor(public result: AnalyzeResult) {
    super("Analyze");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AnalyzeResponse {
    return new AnalyzeResponse(data as AnalyzeResult);
  }
}
