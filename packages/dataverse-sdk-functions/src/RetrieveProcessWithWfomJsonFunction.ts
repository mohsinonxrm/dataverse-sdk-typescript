import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveProcessWithWfomJson function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveProcessWithWfomJsonResponse {
  "@odata.context"?: string;
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
    let url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.RetrieveProcessWithWfomJson`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveProcessWithWfomJsonResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveProcessWithWfomJsonResponse;
  }
}
