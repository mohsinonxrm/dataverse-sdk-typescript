import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TwitterSigninResponse as msdyn_TwitterSigninResponseData } from "./types/index.js";

/**
 * msdyn_TwitterSignin request message
 *
 * Web API Action: msdyn_TwitterSignin
 */
export class msdyn_TwitterSigninRequest
  extends OrganizationRequest
  implements Executable<msdyn_TwitterSigninResponse>
{
  constructor(
    public orgUrl: string,
    public applicationId: string
  ) {
    super("msdyn_TwitterSignin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterSignin`;

    const body: Record<string, unknown> = {
      OrgUrl: this.orgUrl,
      ApplicationId: this.applicationId,
    };

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
    const data = await response.json();
    return msdyn_TwitterSigninResponse.fromResponse(data);
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
