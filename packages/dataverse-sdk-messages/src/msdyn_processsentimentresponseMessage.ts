import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_processsentimentresponseResponse as msdyn_processsentimentresponseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_processsentimentresponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_processsentimentresponseRequestParameters {
  emailId: string;
  copilotResponse: string[];
  conversationId: string;
}

/**
 * msdyn_processsentimentresponse request message
 *
 * Web API Action: msdyn_processsentimentresponse
 */
export class msdyn_processsentimentresponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_processsentimentresponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_processsentimentresponseRequestParameters>;

  constructor(parameters: msdyn_processsentimentresponseRequestParameters) {
    super("msdyn_processsentimentresponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_processsentimentresponse`;

    const body = requestBody({
      emailId: this.Parameters.emailId,
      copilotResponse: this.Parameters.copilotResponse,
      conversationId: this.Parameters.conversationId,
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

  async parseResponse(response: Response): Promise<msdyn_processsentimentresponseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_processsentimentresponseResponse.fromResponse({});
    return msdyn_processsentimentresponseResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_processsentimentresponse response message
 */
export class msdyn_processsentimentresponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_processsentimentresponseResponseData) {
    super("msdyn_processsentimentresponse");
  }

  static fromResponse(data: unknown): msdyn_processsentimentresponseResponse {
    return new msdyn_processsentimentresponseResponse(
      responseObject<msdyn_processsentimentresponseResponseData>(data)
    );
  }
}
