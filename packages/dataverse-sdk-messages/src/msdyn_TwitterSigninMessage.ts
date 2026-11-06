import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TwitterSigninResponse as msdyn_TwitterSigninResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TwitterSignin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TwitterSigninRequestParameters {
  OrgUrl: string;
  ApplicationId: string;
}

/**
 * msdyn_TwitterSignin request message
 *
 * Web API Action: msdyn_TwitterSignin
 */
export class msdyn_TwitterSigninRequest
  extends OrganizationRequest
  implements Executable<msdyn_TwitterSigninResponse>
{
  declare readonly Parameters: Readonly<msdyn_TwitterSigninRequestParameters>;

  constructor(parameters: msdyn_TwitterSigninRequestParameters) {
    super("msdyn_TwitterSignin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterSignin`;

    const body = requestBody({
      OrgUrl: this.Parameters.OrgUrl,
      ApplicationId: this.Parameters.ApplicationId,
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

  async parseResponse(response: Response): Promise<msdyn_TwitterSigninResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TwitterSigninResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_TwitterSignin response message
 */
export class msdyn_TwitterSigninResponse extends OrganizationResponse {
  constructor(public result: msdyn_TwitterSigninResponseData) {
    super("msdyn_TwitterSignin");
  }

  static fromResponse(data: unknown): msdyn_TwitterSigninResponse {
    return new msdyn_TwitterSigninResponse(responseObject<msdyn_TwitterSigninResponseData>(data));
  }
}
