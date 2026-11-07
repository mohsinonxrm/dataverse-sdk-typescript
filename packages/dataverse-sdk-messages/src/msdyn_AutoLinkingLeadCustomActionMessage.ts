import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutoLinkingLeadCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutoLinkingLeadCustomActionRequestParameters {
  AutoLinkRequest?: string;
}

/**
 * msdyn_AutoLinkingLeadCustomAction request message
 *
 * Web API Action: msdyn_AutoLinkingLeadCustomAction
 */
export class msdyn_AutoLinkingLeadCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutoLinkingLeadCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutoLinkingLeadCustomActionRequestParameters>;

  constructor(parameters: msdyn_AutoLinkingLeadCustomActionRequestParameters = {}) {
    super("msdyn_AutoLinkingLeadCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoLinkingLeadCustomAction`;

    const body = requestBody({
      AutoLinkRequest: this.Parameters.AutoLinkRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AutoLinkingLeadCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AutoLinkingLeadCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AutoLinkingLeadCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AutoLinkingLeadCustomActionResult {
  "@odata.context"?: string;
  AutoLinkResponse: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
}

/**
 * msdyn_AutoLinkingLeadCustomAction response message
 *
 * `result` is the value the msdyn_AutoLinkingLeadCustomAction action returns (see {@link msdyn_AutoLinkingLeadCustomActionResult}).
 */
export class msdyn_AutoLinkingLeadCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutoLinkingLeadCustomActionResult) {
    super("msdyn_AutoLinkingLeadCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AutoLinkingLeadCustomActionResponse {
    return new msdyn_AutoLinkingLeadCustomActionResponse(
      data as msdyn_AutoLinkingLeadCustomActionResult
    );
  }
}
