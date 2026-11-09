import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_EmailManagementAgentCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailManagementAgentCustomActionRequestParameters {
  additionalParams?: string;
  emailId: string;
}

/**
 * msdyn_EmailManagementAgentCustomAction request message
 *
 * Web API Action: msdyn_EmailManagementAgentCustomAction
 */
export class msdyn_EmailManagementAgentCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailManagementAgentCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_EmailManagementAgentCustomActionRequestParameters>;

  constructor(parameters: msdyn_EmailManagementAgentCustomActionRequestParameters) {
    super("msdyn_EmailManagementAgentCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailManagementAgentCustomAction`;

    const body = requestBody({
      additionalParams: this.Parameters.additionalParams,
      emailId: this.Parameters.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_EmailManagementAgentCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_EmailManagementAgentCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EmailManagementAgentCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EmailManagementAgentCustomActionResult {
  "@odata.context"?: string;
  status: string;
}

/**
 * msdyn_EmailManagementAgentCustomAction response message
 *
 * `result` is the value the msdyn_EmailManagementAgentCustomAction action returns (see {@link msdyn_EmailManagementAgentCustomActionResult}).
 */
export class msdyn_EmailManagementAgentCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailManagementAgentCustomActionResult) {
    super("msdyn_EmailManagementAgentCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EmailManagementAgentCustomActionResponse {
    return new msdyn_EmailManagementAgentCustomActionResponse(
      data as msdyn_EmailManagementAgentCustomActionResult
    );
  }
}
