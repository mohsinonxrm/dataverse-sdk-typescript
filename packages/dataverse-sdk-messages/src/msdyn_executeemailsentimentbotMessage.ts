import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_executeemailsentimentbot message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_executeemailsentimentbotRequestParameters {
  environmentId: string;
  emailId: string;
}

/**
 * msdyn_executeemailsentimentbot request message
 *
 * Web API Action: msdyn_executeemailsentimentbot
 */
export class msdyn_executeemailsentimentbotRequest
  extends OrganizationRequest
  implements Executable<msdyn_executeemailsentimentbotResponse>
{
  declare readonly Parameters: Readonly<msdyn_executeemailsentimentbotRequestParameters>;

  constructor(parameters: msdyn_executeemailsentimentbotRequestParameters) {
    super("msdyn_executeemailsentimentbot", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_executeemailsentimentbot`;

    const body = requestBody({
      environmentId: this.Parameters.environmentId,
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

  async parseResponse(response: Response): Promise<msdyn_executeemailsentimentbotResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_executeemailsentimentbotResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_executeemailsentimentbot action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_executeemailsentimentbotResult {
  "@odata.context"?: string;
  emailSentimentResponse: string;
}

/**
 * msdyn_executeemailsentimentbot response message
 *
 * `result` is the value the msdyn_executeemailsentimentbot action returns (see {@link msdyn_executeemailsentimentbotResult}).
 */
export class msdyn_executeemailsentimentbotResponse extends OrganizationResponse {
  constructor(public result: msdyn_executeemailsentimentbotResult) {
    super("msdyn_executeemailsentimentbot");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_executeemailsentimentbotResponse {
    return new msdyn_executeemailsentimentbotResponse(data as msdyn_executeemailsentimentbotResult);
  }
}
