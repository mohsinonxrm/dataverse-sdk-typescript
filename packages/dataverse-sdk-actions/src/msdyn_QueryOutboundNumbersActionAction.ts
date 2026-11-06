import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_QueryOutboundNumbersAction action
 */
export interface msdyn_QueryOutboundNumbersActionResponse {
  ActionResult: string;
}

/**
 * msdyn_QueryOutboundNumbersAction action
 *
 * Unbound action
 */
export class msdyn_QueryOutboundNumbersActionAction implements Executable<msdyn_QueryOutboundNumbersActionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueryOutboundNumbersAction`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_QueryOutboundNumbersActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_QueryOutboundNumbersActionResponse;
    return (await response.json()) as msdyn_QueryOutboundNumbersActionResponse;
  }
}
