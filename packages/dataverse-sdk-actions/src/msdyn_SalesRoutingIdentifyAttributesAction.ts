import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_SalesRoutingIdentifyAttributes action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesRoutingIdentifyAttributesResponse {
  "@odata.context"?: string;
  JobId: string;
  JobStatus: boolean;
}

/**
 * msdyn_SalesRoutingIdentifyAttributes action
 *
 * Unbound action
 */
export class msdyn_SalesRoutingIdentifyAttributesAction implements Executable<msdyn_SalesRoutingIdentifyAttributesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesRoutingIdentifyAttributes`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesRoutingIdentifyAttributesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesRoutingIdentifyAttributesResponse;
  }
}
