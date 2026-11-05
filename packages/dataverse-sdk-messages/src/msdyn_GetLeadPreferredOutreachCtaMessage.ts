import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetLeadPreferredOutreachCtaResponse as msdyn_GetLeadPreferredOutreachCtaResponseData } from "./types/index.js";

/**
 * msdyn_GetLeadPreferredOutreachCta request message
 *
 * Web API Action: msdyn_GetLeadPreferredOutreachCta
 */
export class msdyn_GetLeadPreferredOutreachCtaRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLeadPreferredOutreachCtaResponse>
{
  constructor(public msdyn_leadid: string) {
    super("msdyn_GetLeadPreferredOutreachCta");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadPreferredOutreachCta`;

    const body: Record<string, unknown> = {
      msdyn_leadid: this.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadPreferredOutreachCtaResponse> {
    const data = await response.json();
    return msdyn_GetLeadPreferredOutreachCtaResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetLeadPreferredOutreachCta response message
 */
export class msdyn_GetLeadPreferredOutreachCtaResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLeadPreferredOutreachCtaResponseData) {
    super("msdyn_GetLeadPreferredOutreachCta");
  }

  static fromResponse(data: unknown): msdyn_GetLeadPreferredOutreachCtaResponse {
    return new msdyn_GetLeadPreferredOutreachCtaResponse(
      responseObject<msdyn_GetLeadPreferredOutreachCtaResponseData>(data)
    );
  }
}
