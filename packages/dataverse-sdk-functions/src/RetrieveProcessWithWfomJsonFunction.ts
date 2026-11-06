import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveProcessWithWfomJson function
 */
export interface RetrieveProcessWithWfomJsonResponse {
  WfomJson: string;
}

/**
 * RetrieveProcessWithWfomJson function
 *
 * Bound function
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class RetrieveProcessWithWfomJsonFunction implements Executable<RetrieveProcessWithWfomJsonResponse> {
  constructor(public readonly workflowId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.RetrieveProcessWithWfomJson`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveProcessWithWfomJsonResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveProcessWithWfomJsonResponse;
    return (await response.json()) as RetrieveProcessWithWfomJsonResponse;
  }
}
