import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the install action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface installResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as installResponse;
  }
}
