import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetEntityViews action
 */
export interface msdyn_GetEntityViewsResponse {
  msdyn_output: string;
}

/**
 * msdyn_GetEntityViews action
 *
 * Unbound action
 */
export class msdyn_GetEntityViewsAction implements Executable<msdyn_GetEntityViewsResponse> {
  constructor(public readonly msdyn_input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityViews`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityViewsResponse> {
    const data = await response.json();
    return data as msdyn_GetEntityViewsResponse;
  }
}
