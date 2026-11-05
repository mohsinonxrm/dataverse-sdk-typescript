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
    const data = await response.json();
    return data as msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse;
  }
}
