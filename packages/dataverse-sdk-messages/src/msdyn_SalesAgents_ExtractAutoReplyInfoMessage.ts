import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_ExtractAutoReplyInfoResponse as msdyn_SalesAgents_ExtractAutoReplyInfoResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_ExtractAutoReplyInfo request message
 *
 * Web API Action: msdyn_SalesAgents_ExtractAutoReplyInfo
 */
export class msdyn_SalesAgents_ExtractAutoReplyInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ExtractAutoReplyInfoResponse>
{
  constructor(
    public msdyn_TrackingId: string | undefined,
    public msdyn_SalesAgentRun: string | undefined,
    public msdyn_AuthType: number | undefined,
    public msdyn_SalesMacroAgentType: number,
    public msdyn_Thread?: string
  ) {
    super("msdyn_SalesAgents_ExtractAutoReplyInfo");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ExtractAutoReplyInfo`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_AuthType: this.msdyn_AuthType,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_Thread: this.msdyn_Thread,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_ExtractAutoReplyInfoResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_ExtractAutoReplyInfoResponse.fromResponse(data);
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
