import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesOpportunityCatchupResponse as msdyn_SalesOpportunityCatchupResponseData } from "./types/index.js";

/**
 * msdyn_SalesOpportunityCatchup request message
 *
 * Web API Action: msdyn_SalesOpportunityCatchup
 */
export class msdyn_SalesOpportunityCatchupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesOpportunityCatchupResponse>
{
  constructor(
    public msdyn_since: string,
    public msdyn_responseFormat: string,
    public msdyn_additionalParams: string,
    public msdyn_sessionId: string,
    public msdyn_activityId: string,
    public msdyn_skipHeader: string,
    public msdyn_id: string
  ) {
    super("msdyn_SalesOpportunityCatchup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOpportunityCatchup`;

    const body: Record<string, unknown> = {
      msdyn_since: this.msdyn_since,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_sessionId: this.msdyn_sessionId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunityCatchupResponse> {
    const data = await response.json();
    return msdyn_SalesOpportunityCatchupResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesOpportunityCatchup response message
 */
export class msdyn_SalesOpportunityCatchupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesOpportunityCatchupResponseData) {
    super("msdyn_SalesOpportunityCatchup");
  }

  static fromResponse(data: unknown): msdyn_SalesOpportunityCatchupResponse {
    return new msdyn_SalesOpportunityCatchupResponse(
      responseObject<msdyn_SalesOpportunityCatchupResponseData>(data)
    );
  }
}
