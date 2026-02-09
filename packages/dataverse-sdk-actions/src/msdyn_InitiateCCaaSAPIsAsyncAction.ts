import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InitiateCCaaSAPIsAsync action
 */
export interface msdyn_InitiateCCaaSAPIsAsyncResponse {
  msdyn_InitiateCCaaSAPIsAsyncResponse: string;
}

/**
 * msdyn_InitiateCCaaSAPIsAsync action
 *
 * Unbound action
 */
export class msdyn_InitiateCCaaSAPIsAsyncAction implements Executable<msdyn_InitiateCCaaSAPIsAsyncResponse> {
  constructor(
    public readonly payload: string,
    public readonly liveWorkItemId: string,
    public readonly cCaaSAPI: string,
    public readonly initiatingUser: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSAPIsAsync`;

    const body: Record<string, unknown> = {
      Payload: this.payload,
      LiveWorkItemId: this.liveWorkItemId,
      CCaaSAPI: this.cCaaSAPI,
      InitiatingUser: this.initiatingUser,
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSAPIsAsyncResponse> {
    const data = await response.json();
    return data as msdyn_InitiateCCaaSAPIsAsyncResponse;
  }
}
