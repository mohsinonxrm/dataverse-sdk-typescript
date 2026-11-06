import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesRoutingIdentifyAttributes action
 */
export interface msdyn_SalesRoutingIdentifyAttributesResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesRoutingIdentifyAttributesResponse;
  }
}
