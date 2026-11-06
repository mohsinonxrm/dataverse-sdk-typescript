import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetLeadPreferredOutreachCtaResponse as msdyn_GetLeadPreferredOutreachCtaResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetLeadPreferredOutreachCta message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetLeadPreferredOutreachCtaRequestParameters {
  msdyn_leadid: string;
}

/**
 * msdyn_GetLeadPreferredOutreachCta request message
 *
 * Web API Action: msdyn_GetLeadPreferredOutreachCta
 */
export class msdyn_GetLeadPreferredOutreachCtaRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLeadPreferredOutreachCtaResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetLeadPreferredOutreachCtaRequestParameters>;

  constructor(parameters: msdyn_GetLeadPreferredOutreachCtaRequestParameters) {
    super("msdyn_GetLeadPreferredOutreachCta", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadPreferredOutreachCta`;

    const body = requestBody({
      msdyn_leadid: this.Parameters.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadPreferredOutreachCtaResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetLeadPreferredOutreachCtaResponse.fromResponse({});
    return msdyn_GetLeadPreferredOutreachCtaResponse.fromResponse(await response.json());
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
