import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesQualification_GetMCSOnlineEvalSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequestParameters {
  UtcStartTime: string;
  UtcEndTime: string;
  BotSchemaName: string;
}

/**
 * msdyn_SalesQualification_GetMCSOnlineEvalSummary request message
 *
 * Web API Action: msdyn_SalesQualification_GetMCSOnlineEvalSummary
 */
export class msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequestParameters>;

  constructor(parameters: msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequestParameters) {
    super("msdyn_SalesQualification_GetMCSOnlineEvalSummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesQualification_GetMCSOnlineEvalSummary`;

    const body = requestBody({
      UtcStartTime: this.Parameters.UtcStartTime,
      UtcEndTime: this.Parameters.UtcEndTime,
      BotSchemaName: this.Parameters.BotSchemaName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesQualification_GetMCSOnlineEvalSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalSummaryResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  SummaryJson: string;
}

/**
 * msdyn_SalesQualification_GetMCSOnlineEvalSummary response message
 *
 * `result` is the value the msdyn_SalesQualification_GetMCSOnlineEvalSummary action returns (see {@link msdyn_SalesQualification_GetMCSOnlineEvalSummaryResult}).
 */
export class msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_GetMCSOnlineEvalSummaryResult) {
    super("msdyn_SalesQualification_GetMCSOnlineEvalSummary");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse {
    return new msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse(
      data as msdyn_SalesQualification_GetMCSOnlineEvalSummaryResult
    );
  }
}
