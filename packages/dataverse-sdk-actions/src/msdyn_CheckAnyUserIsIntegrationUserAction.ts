import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckAnyUserIsIntegrationUser action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckAnyUserIsIntegrationUserResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckAnyUserIsIntegrationUserResponse;
  }
}
