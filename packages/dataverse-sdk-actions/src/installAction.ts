import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from install action
 */
export interface installResponse {
  flowTriggerUri: string;
  connectionId: string;
  stringifiedConnectionObject: string;
}

/**
 * install action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 */
export class installAction implements Executable<installResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly connectionReferences: string,
    public readonly appIds?: string,
    public readonly context?: string,
    public readonly expand?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.install`;

    const body: Record<string, unknown> = {
      connectionReferences: this.connectionReferences,
      appIds: this.appIds,
      context: this.context,
      expand: this.expand,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<installResponse> {
    const data = await response.json();
    return data as installResponse;
  }
}
