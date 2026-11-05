import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfAutoRouteToOwnerQueueEnabled action
 */
export interface msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * msdyn_CheckIfAutoRouteToOwnerQueueEnabled action
 *
 * Unbound action
 */
export class msdyn_CheckIfAutoRouteToOwnerQueueEnabledAction implements Executable<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAutoRouteToOwnerQueueEnabled`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse;
  }
}
