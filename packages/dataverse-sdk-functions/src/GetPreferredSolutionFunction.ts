import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from GetPreferredSolution function
 */
export interface GetPreferredSolutionResponse {
  value: EntityReference;
}

/**
 * GetPreferredSolution function
 *
 * Unbound function
 */
export class GetPreferredSolutionFunction implements Executable<GetPreferredSolutionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetPreferredSolution`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetPreferredSolutionResponse> {
    const data = await response.json();
    return data as GetPreferredSolutionResponse;
  }
}
