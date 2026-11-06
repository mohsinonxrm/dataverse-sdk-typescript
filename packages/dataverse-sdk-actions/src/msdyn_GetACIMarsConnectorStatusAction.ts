import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetACIMarsConnectorStatus action
 */
export interface msdyn_GetACIMarsConnectorStatusResponse {
  MarsStatus: string;
}

/**
 * msdyn_GetACIMarsConnectorStatus action
 *
 * Unbound action
 */
export class msdyn_GetACIMarsConnectorStatusAction implements Executable<msdyn_GetACIMarsConnectorStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetACIMarsConnectorStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetACIMarsConnectorStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetACIMarsConnectorStatusResponse;
    return (await response.json()) as msdyn_GetACIMarsConnectorStatusResponse;
  }
}
