import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckAnyUserIsIntegrationUser action
 */
export interface msdyn_CheckAnyUserIsIntegrationUserResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  ReturnSeverity: number;
  HelpLink: string;
}

/**
 * msdyn_CheckAnyUserIsIntegrationUser action
 *
 * Unbound action
 */
export class msdyn_CheckAnyUserIsIntegrationUserAction implements Executable<msdyn_CheckAnyUserIsIntegrationUserResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckAnyUserIsIntegrationUser`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckAnyUserIsIntegrationUserResponse> {
    const data = await response.json();
    return data as msdyn_CheckAnyUserIsIntegrationUserResponse;
  }
}
