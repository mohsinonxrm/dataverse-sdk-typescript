import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckMultiplePrimaryIncidentForWorkOrder action
 */
export interface msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
}

/**
 * msdyn_CheckMultiplePrimaryIncidentForWorkOrder action
 *
 * Unbound action
 */
export class msdyn_CheckMultiplePrimaryIncidentForWorkOrderAction implements Executable<msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckMultiplePrimaryIncidentForWorkOrder`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse;
    return (await response.json()) as msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse;
  }
}
