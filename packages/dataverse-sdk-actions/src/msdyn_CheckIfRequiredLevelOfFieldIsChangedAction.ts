import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfRequiredLevelOfFieldIsChanged action
 */
export interface msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * msdyn_CheckIfRequiredLevelOfFieldIsChanged action
 *
 * Unbound action
 */
export class msdyn_CheckIfRequiredLevelOfFieldIsChangedAction implements Executable<msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfRequiredLevelOfFieldIsChanged`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse;
  }
}
