import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount action
 */
export interface msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountActionParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount action
 *
 * Unbound action
 */
export class msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountAction implements Executable<msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse> {
  constructor(
    public readonly parameters: msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse;
    return (await response.json()) as msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse;
  }
}
