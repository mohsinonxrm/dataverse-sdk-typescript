import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the GetPreferredSolution function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GetPreferredSolutionResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as GetPreferredSolutionResponse;
  }
}
