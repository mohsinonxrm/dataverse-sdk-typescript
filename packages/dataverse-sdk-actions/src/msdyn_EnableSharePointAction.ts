import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_EnableSharePoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EnableSharePointResponse {
  "@odata.context"?: string;
  OperationResult: boolean;
}

/**
 * msdyn_EnableSharePoint action
 *
 * Unbound action
 */
export class msdyn_EnableSharePointAction implements Executable<msdyn_EnableSharePointResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableSharePoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableSharePointResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_EnableSharePointResponse;
  }
}
