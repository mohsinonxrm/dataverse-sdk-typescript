import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_generateevaluationsummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_generateevaluationsummaryRequestParameters {
  evaluationId: string;
}

/**
 * msdyn_generateevaluationsummary request message
 *
 * Web API Action: msdyn_generateevaluationsummary
 */
export class msdyn_generateevaluationsummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_generateevaluationsummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_generateevaluationsummaryRequestParameters>;

  constructor(parameters: msdyn_generateevaluationsummaryRequestParameters) {
    super("msdyn_generateevaluationsummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_generateevaluationsummary`;

    const body = requestBody({
      evaluationId: this.Parameters.evaluationId,
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

  async parseResponse(response: Response): Promise<msdyn_generateevaluationsummaryResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_generateevaluationsummaryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_generateevaluationsummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_generateevaluationsummaryResult {
  "@odata.context"?: string;
  actionPlan: string;
  evaluationSummary: string;
  status: string;
}

/**
 * msdyn_generateevaluationsummary response message
 *
 * `result` is the value the msdyn_generateevaluationsummary action returns (see {@link msdyn_generateevaluationsummaryResult}).
 */
export class msdyn_generateevaluationsummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_generateevaluationsummaryResult) {
    super("msdyn_generateevaluationsummary");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_generateevaluationsummaryResponse {
    return new msdyn_generateevaluationsummaryResponse(
      data as msdyn_generateevaluationsummaryResult
    );
  }
}
