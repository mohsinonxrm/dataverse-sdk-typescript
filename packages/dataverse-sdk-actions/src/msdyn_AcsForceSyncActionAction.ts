import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AcsForceSyncAction action
 */
export interface msdyn_AcsForceSyncActionResponse {
  ActionResult: string;
}

/**
 * msdyn_AcsForceSyncAction action
 *
 * Unbound action
 */
export class msdyn_AcsForceSyncActionAction implements Executable<msdyn_AcsForceSyncActionResponse> {
  constructor(public readonly actionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcsForceSyncAction`;

    const body: Record<string, unknown> = {
      ActionRequest: this.actionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AcsForceSyncActionResponse> {
    const data = await response.json();
    return data as msdyn_AcsForceSyncActionResponse;
  }
}
