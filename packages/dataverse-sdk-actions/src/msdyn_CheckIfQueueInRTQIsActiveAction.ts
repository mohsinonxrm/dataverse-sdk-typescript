import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfQueueInRTQIsActive action
 */
export interface msdyn_CheckIfQueueInRTQIsActiveResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfQueueInRTQIsActive action
 *
 * Unbound action
 */
export class msdyn_CheckIfQueueInRTQIsActiveAction implements Executable<msdyn_CheckIfQueueInRTQIsActiveResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfQueueInRTQIsActive`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfQueueInRTQIsActiveResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIfQueueInRTQIsActiveResponse;
    return (await response.json()) as msdyn_CheckIfQueueInRTQIsActiveResponse;
  }
}
