import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesLeadCatchupResponse as msdyn_SalesLeadCatchupResponseData } from "./types/index.js";

/**
 * msdyn_SalesLeadCatchup request message
 *
 * Web API Action: msdyn_SalesLeadCatchup
 */
export class msdyn_SalesLeadCatchupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesLeadCatchupResponse>
{
  constructor(
    public msdyn_since: string | undefined,
    public msdyn_sessionId: string | undefined,
    public msdyn_responseFormat: string | undefined,
    public msdyn_additionalParams: string | undefined,
    public msdyn_activityId: string | undefined,
    public msdyn_skipHeader: string | undefined,
    public msdyn_id: string
  ) {
    super("msdyn_SalesLeadCatchup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesLeadCatchup`;

    const body: Record<string, unknown> = {
      msdyn_since: this.msdyn_since,
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_skipHeader: this.msdyn_skipHeader,
      msdyn_id: this.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesLeadCatchupResponse> {
    const data = await response.json();
    return msdyn_SalesLeadCatchupResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesLeadCatchup response message
 */
export class msdyn_SalesLeadCatchupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesLeadCatchupResponseData) {
    super("msdyn_SalesLeadCatchup");
  }

  static fromResponse(data: unknown): msdyn_SalesLeadCatchupResponse {
    return new msdyn_SalesLeadCatchupResponse(
      responseObject<msdyn_SalesLeadCatchupResponseData>(data)
    );
  }
}
