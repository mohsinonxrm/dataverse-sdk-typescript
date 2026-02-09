import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SummarySynthesizerStatus request message
 *
 * Web API Action: msdyn_SummarySynthesizerStatus
 */
export class msdyn_SummarySynthesizerStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SummarySynthesizerStatusResponse>
{
  constructor(public leadId: string) {
    super("msdyn_SummarySynthesizerStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SummarySynthesizerStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_SummarySynthesizerStatusResponse> {
    const data = await response.json();
    return msdyn_SummarySynthesizerStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LeadId: this.leadId,
    };
  }
}

/**
 * msdyn_SummarySynthesizerStatus response message
 */
export class msdyn_SummarySynthesizerStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SummarySynthesizerStatusResponse) {
    super("msdyn_SummarySynthesizerStatus");
  }

  static fromResponse(data: unknown): msdyn_SummarySynthesizerStatusResponse {
    return new msdyn_SummarySynthesizerStatusResponse((data as any).value);
  }
}
