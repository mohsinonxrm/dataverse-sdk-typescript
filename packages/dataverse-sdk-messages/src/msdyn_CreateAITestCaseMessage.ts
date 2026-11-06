import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateAITestCaseResponse as msdyn_CreateAITestCaseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateAITestCase message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAITestCaseRequestParameters {
  request: string;
}

/**
 * msdyn_CreateAITestCase request message
 *
 * Web API Action: msdyn_CreateAITestCase
 */
export class msdyn_CreateAITestCaseRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateAITestCaseResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateAITestCaseRequestParameters>;

  constructor(parameters: msdyn_CreateAITestCaseRequestParameters) {
    super("msdyn_CreateAITestCase", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAITestCase`;

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

  async parseResponse(response: Response): Promise<msdyn_CreateAITestCaseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateAITestCaseResponse.fromResponse({});
    return msdyn_CreateAITestCaseResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateAITestCase response message
 */
export class msdyn_CreateAITestCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAITestCaseResponseData) {
    super("msdyn_CreateAITestCase");
  }

  static fromResponse(data: unknown): msdyn_CreateAITestCaseResponse {
    return new msdyn_CreateAITestCaseResponse(
      responseObject<msdyn_CreateAITestCaseResponseData>(data)
    );
  }
}
