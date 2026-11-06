import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_TwitterSignin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TwitterSigninResponse {
  "@odata.context"?: string;
  SigninUrl: string;
  StatusCode: number;
}

/**
 * Parameters of the msdyn_TwitterSignin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TwitterSigninActionParameters {
  OrgUrl: string;
  ApplicationId: string;
}

/**
 * msdyn_TwitterSignin action
 *
 * Unbound action
 */
export class msdyn_TwitterSigninAction implements Executable<msdyn_TwitterSigninResponse> {
  constructor(public readonly parameters: msdyn_TwitterSigninActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterSignin`;

    const body = requestBody({
      OrgUrl: this.parameters.OrgUrl,
      ApplicationId: this.parameters.ApplicationId,
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
    return (await response.json()) as msdyn_TwitterSigninResponse;
  }
}
