import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AITestRunResponse as msdyn_AITestRunResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AITestRun message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AITestRunRequestParameters {
  request: string;
}

/**
 * msdyn_AITestRun request message
 *
 * Web API Action: msdyn_AITestRun
 *
 * The first argument is the id of the msdyn_aitestcase record to call it on.
 */
export class msdyn_AITestRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_AITestRunResponse>
{
  declare readonly Parameters: Readonly<msdyn_AITestRunRequestParameters>;

  constructor(
    public msdyn_aitestcaseId: string,
    parameters: msdyn_AITestRunRequestParameters
  ) {
    super("msdyn_AITestRun", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aitestcases(${this.msdyn_aitestcaseId})/Microsoft.Dynamics.CRM.msdyn_AITestRun`;

    const body = requestBody({
      request: this.Parameters.request,
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

  async parseResponse(response: Response): Promise<msdyn_AITestRunResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_AITestRunResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_AITestRun response message
 */
export class msdyn_AITestRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_AITestRunResponseData) {
    super("msdyn_AITestRun");
  }

  static fromResponse(data: unknown): msdyn_AITestRunResponse {
    return new msdyn_AITestRunResponse(responseObject<msdyn_AITestRunResponseData>(data));
  }
}
