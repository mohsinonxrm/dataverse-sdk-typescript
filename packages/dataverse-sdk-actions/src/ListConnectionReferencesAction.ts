import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ListConnectionReferences action
 */
export interface ListConnectionReferencesResponse {
  connections: string;
  connectionReferences: string;
  mappingBetweenLogicalNameAndName: string;
}

/**
 * ListConnectionReferences action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
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
    const data = await response.json();
    return data as ListConnectionReferencesResponse;
  }
}
