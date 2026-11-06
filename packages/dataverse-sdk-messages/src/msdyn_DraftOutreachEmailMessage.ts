import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DraftOutreachEmailResponse as msdyn_DraftOutreachEmailResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_DraftOutreachEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DraftOutreachEmailRequestParameters {
  LeadId: string;
}

/**
 * msdyn_DraftOutreachEmail request message
 *
 * Web API Action: msdyn_DraftOutreachEmail
 */
export class msdyn_DraftOutreachEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_DraftOutreachEmailResponse>
{
  declare readonly Parameters: Readonly<msdyn_DraftOutreachEmailRequestParameters>;

  constructor(parameters: msdyn_DraftOutreachEmailRequestParameters) {
    super("msdyn_DraftOutreachEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftOutreachEmail`;

    const body = requestBody({
      LeadId: this.Parameters.LeadId,
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

  async parseResponse(response: Response): Promise<msdyn_DraftOutreachEmailResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_DraftOutreachEmailResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_DraftOutreachEmail response message
 */
export class msdyn_DraftOutreachEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_DraftOutreachEmailResponseData) {
    super("msdyn_DraftOutreachEmail");
  }

  static fromResponse(data: unknown): msdyn_DraftOutreachEmailResponse {
    return new msdyn_DraftOutreachEmailResponse(
      responseObject<msdyn_DraftOutreachEmailResponseData>(data)
    );
  }
}
