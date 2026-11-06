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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse;
  }
}
