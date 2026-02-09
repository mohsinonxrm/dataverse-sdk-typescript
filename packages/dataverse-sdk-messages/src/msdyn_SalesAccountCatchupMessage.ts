import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAccountCatchup request message
 *
 * Web API Action: msdyn_SalesAccountCatchup
 */
export class msdyn_SalesAccountCatchupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAccountCatchupResponse>
{
  constructor(
    public msdyn_id: string,
    public msdyn_sessionId: string,
    public msdyn_responseFormat: string,
    public msdyn_activityId: string,
    public msdyn_since: string,
    public msdyn_skipHeader: string,
    public msdyn_additionalParams: string
  ) {
    super("msdyn_SalesAccountCatchup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAccountCatchup`;

    const body: Record<string, unknown> = {
      msdyn_id: this.msdyn_id,
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_since: this.msdyn_since,
      msdyn_skipHeader: this.msdyn_skipHeader,
      msdyn_additionalParams: this.msdyn_additionalParams,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAccountCatchupResponse> {
    const data = await response.json();
    return msdyn_SalesAccountCatchupResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_id: this.msdyn_id,
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_since: this.msdyn_since,
      msdyn_skipHeader: this.msdyn_skipHeader,
      msdyn_additionalParams: this.msdyn_additionalParams,
    };
  }
}

/**
 * msdyn_SalesAccountCatchup response message
 */
export class msdyn_SalesAccountCatchupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAccountCatchupResponse) {
    super("msdyn_SalesAccountCatchup");
  }

  static fromResponse(data: unknown): msdyn_SalesAccountCatchupResponse {
    return new msdyn_SalesAccountCatchupResponse((data as any).value);
  }
}
