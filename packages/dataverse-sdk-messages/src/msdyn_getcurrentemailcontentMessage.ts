import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_getcurrentemailcontentResponse as msdyn_getcurrentemailcontentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_getcurrentemailcontent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getcurrentemailcontentRequestParameters {
  emailId: string;
}

/**
 * msdyn_getcurrentemailcontent request message
 *
 * Web API Action: msdyn_getcurrentemailcontent
 */
export class msdyn_getcurrentemailcontentRequest
  extends OrganizationRequest
  implements Executable<msdyn_getcurrentemailcontentResponse>
{
  declare readonly Parameters: Readonly<msdyn_getcurrentemailcontentRequestParameters>;

  constructor(parameters: msdyn_getcurrentemailcontentRequestParameters) {
    super("msdyn_getcurrentemailcontent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getcurrentemailcontent`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_getcurrentemailcontentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_getcurrentemailcontentResponse.fromResponse({});
    return msdyn_getcurrentemailcontentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_getcurrentemailcontent response message
 */
export class msdyn_getcurrentemailcontentResponse extends OrganizationResponse {
  constructor(public result: msdyn_getcurrentemailcontentResponseData) {
    super("msdyn_getcurrentemailcontent");
  }

  static fromResponse(data: unknown): msdyn_getcurrentemailcontentResponse {
    return new msdyn_getcurrentemailcontentResponse(
      responseObject<msdyn_getcurrentemailcontentResponseData>(data)
    );
  }
}
