import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_TwitterSigninResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TwitterSignin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TwitterSigninResult {
  "@odata.context"?: string;
  SigninUrl: string;
  StatusCode: number;
}

/**
 * msdyn_TwitterSignin response message
 *
 * `result` is the value the msdyn_TwitterSignin action returns (see {@link msdyn_TwitterSigninResult}).
 */
export class msdyn_TwitterSigninResponse extends OrganizationResponse {
  constructor(public result: msdyn_TwitterSigninResult) {
    super("msdyn_TwitterSignin");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TwitterSigninResponse {
    return new msdyn_TwitterSigninResponse(data as msdyn_TwitterSigninResult);
  }
}
