import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the UpdateProcessWithWfomJson action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateProcessWithWfomJsonResponse = void;

/**
 * Parameters of the UpdateProcessWithWfomJson action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateProcessWithWfomJsonActionParameters {
  Entity: EntityReference | AnyEntityPayload;
  WfomJson: string;
}

/**
 * UpdateProcessWithWfomJson action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class UpdateProcessWithWfomJsonAction implements Executable<UpdateProcessWithWfomJsonResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly parameters: UpdateProcessWithWfomJsonActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.UpdateProcessWithWfomJson`;

    const body = requestBody({
      Entity: this.parameters.Entity,
      WfomJson: this.parameters.WfomJson,
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

  parseResponse(_response: Response): Promise<UpdateProcessWithWfomJsonResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
