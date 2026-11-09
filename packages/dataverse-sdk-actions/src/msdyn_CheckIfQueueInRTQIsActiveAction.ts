import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfQueueInRTQIsActive action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfQueueInRTQIsActiveResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfQueueInRTQIsActiveResponse;
  }
}
