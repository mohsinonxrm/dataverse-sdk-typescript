import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_FetchEventingScenarios action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchEventingScenariosResponse {
  "@odata.context"?: string;
  errormessage: string;
  scenarios: string;
}

/**
 * msdyn_FetchEventingScenarios action
 *
 * Unbound action
 */
export class msdyn_FetchEventingScenariosAction implements Executable<msdyn_FetchEventingScenariosResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchEventingScenarios`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_FetchEventingScenariosResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FetchEventingScenariosResponse;
  }
}
