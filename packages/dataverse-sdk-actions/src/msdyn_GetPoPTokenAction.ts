import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetPoPToken action
 */
export interface msdyn_GetPoPTokenResponse {
  popToken: string;
}

/**
 * msdyn_GetPoPToken action
 *
 * Unbound action
 */
export class msdyn_GetPoPTokenAction implements Executable<msdyn_GetPoPTokenResponse> {
  constructor(
    public readonly scope: string,
    public readonly audience: string,
    public readonly aadObjectId: string,
    public readonly httpMethod: string,
    public readonly secureString: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPoPToken`;

    const body: Record<string, unknown> = {
      scope: this.scope,
      audience: this.audience,
      aadObjectId: this.aadObjectId,
      httpMethod: this.httpMethod,
      secureString: this.secureString,
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

  async parseResponse(response: Response): Promise<msdyn_GetPoPTokenResponse> {
    const data = await response.json();
    return data as msdyn_GetPoPTokenResponse;
  }
}
