import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from install action
 */
export interface installResponse {
  connectionId: string;
  flowTriggerUri: string;
  stringifiedConnectionObject: string;
}

/**
 * Parameters of the install action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface installActionParameters {
  connectionReferences: string;
  appIds?: string;
  context?: string;
  expand?: string;
}

/**
 * install action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class installAction implements Executable<installResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly parameters: installActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.install`;

    const body = requestBody({
      connectionReferences: this.parameters.connectionReferences,
      appIds: this.parameters.appIds,
      context: this.parameters.context,
      expand: this.parameters.expand,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as installResponse;
    return (await response.json()) as installResponse;
  }
}
