import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FetchEventingScenarios action
 */
export interface msdyn_FetchEventingScenariosResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_FetchEventingScenariosResponse;
    return (await response.json()) as msdyn_FetchEventingScenariosResponse;
  }
}
