import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ListConnectionReferences action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ListConnectionReferencesResponse {
  "@odata.context"?: string;
  connectionReferences: string;
  connections: string;
  mappingBetweenLogicalNameAndName: string;
}

/**
 * ListConnectionReferences action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class ListConnectionReferencesAction implements Executable<ListConnectionReferencesResponse> {
  constructor(public readonly workflowId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.ListConnectionReferences`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListConnectionReferencesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ListConnectionReferencesResponse;
  }
}
