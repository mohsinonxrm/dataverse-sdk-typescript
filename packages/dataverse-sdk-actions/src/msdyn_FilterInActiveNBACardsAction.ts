import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FilterInActiveNBACards action
 */
export interface msdyn_FilterInActiveNBACardsResponse {
  msdyn_ActiveNBAEntityIds: string;
}

/**
 * msdyn_FilterInActiveNBACards action
 *
 * Unbound action
 */
export class msdyn_FilterInActiveNBACardsAction implements Executable<msdyn_FilterInActiveNBACardsResponse> {
  constructor(public readonly msdyn_NBAEntityIds: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FilterInActiveNBACards`;

    const body: Record<string, unknown> = {
      msdyn_NBAEntityIds: this.msdyn_NBAEntityIds,
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

  async parseResponse(response: Response): Promise<msdyn_FilterInActiveNBACardsResponse> {
    const data = await response.json();
    return data as msdyn_FilterInActiveNBACardsResponse;
  }
}
