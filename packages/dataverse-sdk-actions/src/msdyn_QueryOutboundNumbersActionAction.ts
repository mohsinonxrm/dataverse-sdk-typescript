import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_QueryOutboundNumbersAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_QueryOutboundNumbersActionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_QueryOutboundNumbersActionResponse;
  }
}
