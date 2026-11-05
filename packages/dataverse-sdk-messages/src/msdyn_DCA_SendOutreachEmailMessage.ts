import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DCA_SendOutreachEmail request message
 *
 * Web API Action: msdyn_DCA_SendOutreachEmail
 */
export class msdyn_DCA_SendOutreachEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_DCA_SendOutreachEmailResponse>
{
  constructor(
    public msdyn_TrackingId: string,
    public msdyn_SalesAgentRun: string
  ) {
    super("msdyn_DCA_SendOutreachEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DCA_SendOutreachEmail`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
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

  async parseResponse(response: Response): Promise<msdyn_DCA_SendOutreachEmailResponse> {
    const data = await response.json();
    return msdyn_DCA_SendOutreachEmailResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
    };
  }
}

/**
 * msdyn_DCA_SendOutreachEmail response message
 */
export class msdyn_DCA_SendOutreachEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_DCA_SendOutreachEmailResponse) {
    super("msdyn_DCA_SendOutreachEmail");
  }

  static fromResponse(data: unknown): msdyn_DCA_SendOutreachEmailResponse {
    return new msdyn_DCA_SendOutreachEmailResponse((data as any).value);
  }
}
