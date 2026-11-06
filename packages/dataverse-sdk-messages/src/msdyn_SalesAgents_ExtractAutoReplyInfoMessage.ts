import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_ExtractAutoReplyInfoResponse as msdyn_SalesAgents_ExtractAutoReplyInfoResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_ExtractAutoReplyInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ExtractAutoReplyInfoRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_SalesAgentRun?: string;
  msdyn_AuthType?: number;
  msdyn_SalesMacroAgentType: number;
  msdyn_Thread?: string;
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
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_AuthType: this.Parameters.msdyn_AuthType,
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
      msdyn_Thread: this.Parameters.msdyn_Thread,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_ExtractAutoReplyInfoResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_SalesAgents_ExtractAutoReplyInfo response message
 */
export class msdyn_SalesAgents_ExtractAutoReplyInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ExtractAutoReplyInfoResponseData) {
    super("msdyn_SalesAgents_ExtractAutoReplyInfo");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ExtractAutoReplyInfoResponse {
    return new msdyn_SalesAgents_ExtractAutoReplyInfoResponse(
      responseObject<msdyn_SalesAgents_ExtractAutoReplyInfoResponseData>(data)
    );
  }
}
