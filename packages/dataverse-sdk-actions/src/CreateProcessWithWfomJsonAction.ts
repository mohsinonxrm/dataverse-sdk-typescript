import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the CreateProcessWithWfomJson action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CreateProcessWithWfomJsonResponse = void;

/**
 * Parameters of the CreateProcessWithWfomJson action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateProcessWithWfomJsonActionParameters {
  Entity: EntityReference | AnyEntityPayload;
  WfomJson: string;
}

/**
 * CreateProcessWithWfomJson action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workflow)
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class CreateProcessWithWfomJsonAction implements Executable<CreateProcessWithWfomJsonResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly parameters: CreateProcessWithWfomJsonActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.CreateProcessWithWfomJson`;

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

  parseResponse(_response: Response): Promise<CreateProcessWithWfomJsonResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
