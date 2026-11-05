import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount action
 */
export interface msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount action
 *
 * Unbound action
 */
export class msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountAction implements Executable<msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount`;

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
  ): Promise<msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse;
  }
}
