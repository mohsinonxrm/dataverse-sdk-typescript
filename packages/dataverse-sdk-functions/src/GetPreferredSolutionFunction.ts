import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetPreferredSolution function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface GetPreferredSolutionResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GetPreferredSolutionResponse;
  }
}
