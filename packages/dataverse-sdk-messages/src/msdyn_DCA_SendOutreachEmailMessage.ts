import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DCA_SendOutreachEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DCA_SendOutreachEmailRequestParameters {
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId?: string;
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
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
    // The body is the complex value, with its @odata.context
    return msdyn_DCA_SendOutreachEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DCA_SendOutreachEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DCA_SendOutreachEmailResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_DCA_SendOutreachEmail response message
 *
 * `result` is the value the msdyn_DCA_SendOutreachEmail action returns (see {@link msdyn_DCA_SendOutreachEmailResult}).
 */
export class msdyn_DCA_SendOutreachEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_DCA_SendOutreachEmailResult) {
    super("msdyn_DCA_SendOutreachEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DCA_SendOutreachEmailResponse {
    return new msdyn_DCA_SendOutreachEmailResponse(data as msdyn_DCA_SendOutreachEmailResult);
  }
}
