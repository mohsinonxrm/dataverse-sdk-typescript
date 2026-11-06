import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_executeemailsentimentbotResponse as msdyn_executeemailsentimentbotResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_executeemailsentimentbotResponse.fromResponse({});
    return msdyn_executeemailsentimentbotResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_executeemailsentimentbot response message
 */
export class msdyn_executeemailsentimentbotResponse extends OrganizationResponse {
  constructor(public result: msdyn_executeemailsentimentbotResponseData) {
    super("msdyn_executeemailsentimentbot");
  }

  static fromResponse(data: unknown): msdyn_executeemailsentimentbotResponse {
    return new msdyn_executeemailsentimentbotResponse(
      responseObject<msdyn_executeemailsentimentbotResponseData>(data)
    );
  }
}
