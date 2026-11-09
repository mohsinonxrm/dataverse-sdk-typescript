import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ExtractAutoReplyInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ExtractAutoReplyInfoRequestParameters {
  msdyn_SalesAgentRun?: string;
  msdyn_TrackingId?: string;
  msdyn_AuthType?: number;
  msdyn_Thread?: string;
  msdyn_SalesMacroAgentType: number;
}

/**
 * msdyn_SalesAgents_ExtractAutoReplyInfo request message
 *
 * Web API Action: msdyn_SalesAgents_ExtractAutoReplyInfo
 */
export class msdyn_SalesAgents_ExtractAutoReplyInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ExtractAutoReplyInfoResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ExtractAutoReplyInfoRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ExtractAutoReplyInfoRequestParameters) {
    super("msdyn_SalesAgents_ExtractAutoReplyInfo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ExtractAutoReplyInfo`;

    const body = requestBody({
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_AuthType: this.Parameters.msdyn_AuthType,
      msdyn_Thread: this.Parameters.msdyn_Thread,
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_ExtractAutoReplyInfoResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ExtractAutoReplyInfoResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_ExtractAutoReplyInfo action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ExtractAutoReplyInfoResult {
  "@odata.context"?: string;
  msdyn_AutoReplyInfo: string;
}

/**
 * msdyn_SalesAgents_ExtractAutoReplyInfo response message
 *
 * `result` is the value the msdyn_SalesAgents_ExtractAutoReplyInfo action returns (see {@link msdyn_SalesAgents_ExtractAutoReplyInfoResult}).
 */
export class msdyn_SalesAgents_ExtractAutoReplyInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ExtractAutoReplyInfoResult) {
    super("msdyn_SalesAgents_ExtractAutoReplyInfo");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ExtractAutoReplyInfoResponse {
    return new msdyn_SalesAgents_ExtractAutoReplyInfoResponse(
      data as msdyn_SalesAgents_ExtractAutoReplyInfoResult
    );
  }
}
