import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_EmailManagementAgentCustomActionResponse as msdyn_EmailManagementAgentCustomActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_EmailManagementAgentCustomActionResponse.fromResponse({});
    return msdyn_EmailManagementAgentCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_EmailManagementAgentCustomAction response message
 */
export class msdyn_EmailManagementAgentCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailManagementAgentCustomActionResponseData) {
    super("msdyn_EmailManagementAgentCustomAction");
  }

  static fromResponse(data: unknown): msdyn_EmailManagementAgentCustomActionResponse {
    return new msdyn_EmailManagementAgentCustomActionResponse(
      responseObject<msdyn_EmailManagementAgentCustomActionResponseData>(data)
    );
  }
}
