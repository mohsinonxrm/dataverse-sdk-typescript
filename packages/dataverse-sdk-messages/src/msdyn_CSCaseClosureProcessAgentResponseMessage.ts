import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CSCaseClosureProcessAgentResponseResponse as msdyn_CSCaseClosureProcessAgentResponseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CSCaseClosureProcessAgentResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSCaseClosureProcessAgentResponseRequestParameters {
  msdyn_payload: string;
}

/**
 * msdyn_CSCaseClosureProcessAgentResponse request message
 *
 * Web API Action: msdyn_CSCaseClosureProcessAgentResponse
 */
export class msdyn_CSCaseClosureProcessAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSCaseClosureProcessAgentResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_CSCaseClosureProcessAgentResponseRequestParameters>;

  constructor(parameters: msdyn_CSCaseClosureProcessAgentResponseRequestParameters) {
    super("msdyn_CSCaseClosureProcessAgentResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCaseClosureProcessAgentResponse`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CSCaseClosureProcessAgentResponseResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CSCaseClosureProcessAgentResponseResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CSCaseClosureProcessAgentResponse response message
 */
export class msdyn_CSCaseClosureProcessAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCaseClosureProcessAgentResponseResponseData) {
    super("msdyn_CSCaseClosureProcessAgentResponse");
  }

  static fromResponse(data: unknown): msdyn_CSCaseClosureProcessAgentResponseResponse {
    return new msdyn_CSCaseClosureProcessAgentResponseResponse(
      responseObject<msdyn_CSCaseClosureProcessAgentResponseResponseData>(data)
    );
  }
}
