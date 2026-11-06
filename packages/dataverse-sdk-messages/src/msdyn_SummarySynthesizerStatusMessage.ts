import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SummarySynthesizerStatusResponse as msdyn_SummarySynthesizerStatusResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SummarySynthesizerStatusResponse> {
    const data = await response.json();
    return msdyn_SummarySynthesizerStatusResponse.fromResponse(data);
  }
}

/**
 * msdyn_SummarySynthesizerStatus response message
 */
export class msdyn_SummarySynthesizerStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SummarySynthesizerStatusResponseData) {
    super("msdyn_SummarySynthesizerStatus");
  }

  static fromResponse(data: unknown): msdyn_SummarySynthesizerStatusResponse {
    return new msdyn_SummarySynthesizerStatusResponse(
      responseObject<msdyn_SummarySynthesizerStatusResponseData>(data)
    );
  }
}
