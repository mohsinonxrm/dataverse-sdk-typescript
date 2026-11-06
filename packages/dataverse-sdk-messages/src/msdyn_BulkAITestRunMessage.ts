import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_BulkAITestRunResponse as msdyn_BulkAITestRunResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_BulkAITestRun message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BulkAITestRunRequestParameters {
  request: string;
}

/**
 * msdyn_BulkAITestRun request message
 *
 * Web API Action: msdyn_BulkAITestRun
 */
export class msdyn_BulkAITestRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_BulkAITestRunResponse>
{
  declare readonly Parameters: Readonly<msdyn_BulkAITestRunRequestParameters>;

  constructor(parameters: msdyn_BulkAITestRunRequestParameters) {
    super("msdyn_BulkAITestRun", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BulkAITestRun`;

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

  async parseResponse(response: Response): Promise<msdyn_BulkAITestRunResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_BulkAITestRunResponse.fromResponse({});
    return msdyn_BulkAITestRunResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_BulkAITestRun response message
 */
export class msdyn_BulkAITestRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_BulkAITestRunResponseData) {
    super("msdyn_BulkAITestRun");
  }

  static fromResponse(data: unknown): msdyn_BulkAITestRunResponse {
    return new msdyn_BulkAITestRunResponse(responseObject<msdyn_BulkAITestRunResponseData>(data));
  }
}
