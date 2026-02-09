import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WKWGDPRDeleteStatus action
 */
export interface msdyn_WKWGDPRDeleteStatusResponse {
  Response: string;
}

/**
 * msdyn_WKWGDPRDeleteStatus action
 *
 * Unbound action
 */
export class msdyn_WKWGDPRDeleteStatusAction implements Executable<msdyn_WKWGDPRDeleteStatusResponse> {
  constructor(public readonly userIds: string[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WKWGDPRDeleteStatus`;

    const body: Record<string, unknown> = {
      UserIds: this.userIds,
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

  async parseResponse(response: Response): Promise<msdyn_WKWGDPRDeleteStatusResponse> {
    const data = await response.json();
    return data as msdyn_WKWGDPRDeleteStatusResponse;
  }
}
