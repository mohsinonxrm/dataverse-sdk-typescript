import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DCA_SendOutreachEmailResponse as msdyn_DCA_SendOutreachEmailResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_DCA_SendOutreachEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DCA_SendOutreachEmailRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_SalesAgentRun: string;
}

/**
 * msdyn_DCA_SendOutreachEmail request message
 *
 * Web API Action: msdyn_DCA_SendOutreachEmail
 */
export class msdyn_DCA_SendOutreachEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_DCA_SendOutreachEmailResponse>
{
  declare readonly Parameters: Readonly<msdyn_DCA_SendOutreachEmailRequestParameters>;

  constructor(parameters: msdyn_DCA_SendOutreachEmailRequestParameters) {
    super("msdyn_DCA_SendOutreachEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DCA_SendOutreachEmail`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
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

  async parseResponse(response: Response): Promise<msdyn_DCA_SendOutreachEmailResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_DCA_SendOutreachEmailResponse.fromResponse({});
    return msdyn_DCA_SendOutreachEmailResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_DCA_SendOutreachEmail response message
 */
export class msdyn_DCA_SendOutreachEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_DCA_SendOutreachEmailResponseData) {
    super("msdyn_DCA_SendOutreachEmail");
  }

  static fromResponse(data: unknown): msdyn_DCA_SendOutreachEmailResponse {
    return new msdyn_DCA_SendOutreachEmailResponse(
      responseObject<msdyn_DCA_SendOutreachEmailResponseData>(data)
    );
  }
}
