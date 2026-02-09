import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TwitterSignin action
 */
export interface msdyn_TwitterSigninResponse {
  StatusCode: number;
  SigninUrl: string;
}

/**
 * msdyn_TwitterSignin action
 *
 * Unbound action
 */
export class msdyn_TwitterSigninAction implements Executable<msdyn_TwitterSigninResponse> {
  constructor(
    public readonly orgUrl: string,
    public readonly applicationId: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TwitterSigninResponse> {
    const data = await response.json();
    return data as msdyn_TwitterSigninResponse;
  }
}
