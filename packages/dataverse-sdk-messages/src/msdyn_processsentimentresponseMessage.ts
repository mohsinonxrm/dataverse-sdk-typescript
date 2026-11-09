import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_processsentimentresponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_processsentimentresponseRequestParameters {
  conversationId: string;
  emailId: string;
  copilotResponse: string[];
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
      conversationId: this.Parameters.conversationId,
      emailId: this.Parameters.emailId,
      copilotResponse: this.Parameters.copilotResponse,
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
    // The body is the complex value, with its @odata.context
    return msdyn_processsentimentresponseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_processsentimentresponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_processsentimentresponseResult {
  "@odata.context"?: string;
  sentimentResponse: string;
}

/**
 * msdyn_processsentimentresponse response message
 *
 * `result` is the value the msdyn_processsentimentresponse action returns (see {@link msdyn_processsentimentresponseResult}).
 */
export class msdyn_processsentimentresponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_processsentimentresponseResult) {
    super("msdyn_processsentimentresponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_processsentimentresponseResponse {
    return new msdyn_processsentimentresponseResponse(data as msdyn_processsentimentresponseResult);
  }
}
