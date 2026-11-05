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
    const data = await response.json();
    return data as msdyn_CheckIfQueueInRTQIsActiveResponse;
  }
}
