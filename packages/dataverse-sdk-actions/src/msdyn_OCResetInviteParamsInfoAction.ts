import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OCResetInviteParamsInfo action
 */
export interface msdyn_OCResetInviteParamsInfoResponse {
  ResponseData: string;
}

/**
 * msdyn_OCResetInviteParamsInfo action
 *
 * Unbound action
 */
export class msdyn_OCResetInviteParamsInfoAction implements Executable<msdyn_OCResetInviteParamsInfoResponse> {
  constructor(public readonly liveWorkItemId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OCResetInviteParamsInfo`;

    const body: Record<string, unknown> = {
      LiveWorkItemId: this.liveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_OCResetInviteParamsInfoResponse> {
    const data = await response.json();
    return data as msdyn_OCResetInviteParamsInfoResponse;
  }
}
