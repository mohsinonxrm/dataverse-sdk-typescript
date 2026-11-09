import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetACIMarsConnectorStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetACIMarsConnectorStatusResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetACIMarsConnectorStatusResponse;
  }
}
