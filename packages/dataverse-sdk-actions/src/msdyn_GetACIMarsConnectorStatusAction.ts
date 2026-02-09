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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetACIMarsConnectorStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetACIMarsConnectorStatusResponse;
  }
}
