import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DraftOutreachEmail request message
 *
 * Web API Action: msdyn_DraftOutreachEmail
 */
export class msdyn_DraftOutreachEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_DraftOutreachEmailResponse>
{
  constructor(public leadId: string) {
    super("msdyn_DraftOutreachEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftOutreachEmail`;

    const body: Record<string, unknown> = {
      LeadId: this.leadId,
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

  async parseResponse(response: Response): Promise<msdyn_DraftOutreachEmailResponse> {
    const data = await response.json();
    return msdyn_DraftOutreachEmailResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LeadId: this.leadId,
    };
  }
}

/**
 * msdyn_DraftOutreachEmail response message
 */
export class msdyn_DraftOutreachEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_DraftOutreachEmailResponse) {
    super("msdyn_DraftOutreachEmail");
  }

  static fromResponse(data: unknown): msdyn_DraftOutreachEmailResponse {
    return new msdyn_DraftOutreachEmailResponse((data as any).value);
  }
}
