import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TwitterSignin action
 */
export interface msdyn_TwitterSigninResponse {
  StatusCode: number;
  SigninUrl: string;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TwitterSigninResponse;
    return (await response.json()) as msdyn_TwitterSigninResponse;
  }
}
