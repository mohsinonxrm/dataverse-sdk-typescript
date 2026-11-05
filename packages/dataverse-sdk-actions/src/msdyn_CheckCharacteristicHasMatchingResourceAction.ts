import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckCharacteristicHasMatchingResource action
 */
export interface msdyn_CheckCharacteristicHasMatchingResourceResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckCharacteristicHasMatchingResource action
 *
 * Unbound action
 */
export class msdyn_CheckCharacteristicHasMatchingResourceAction implements Executable<msdyn_CheckCharacteristicHasMatchingResourceResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckCharacteristicHasMatchingResource`;

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
  ): Promise<msdyn_CheckCharacteristicHasMatchingResourceResponse> {
    const data = await response.json();
    return data as msdyn_CheckCharacteristicHasMatchingResourceResponse;
  }
}
