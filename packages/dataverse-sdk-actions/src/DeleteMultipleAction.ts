import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DeleteMultiple action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type DeleteMultipleResponse = void;

/**
 * Parameters of the DeleteMultiple action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteMultipleActionParameters {
  Targets: Record<string, unknown>[];
}

/**
 * DeleteMultiple action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.crmbaseentity))
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class DeleteMultipleAction implements Executable<DeleteMultipleResponse> {
  constructor(
    public readonly entitySetName: string,
    public readonly parameters: DeleteMultipleActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.DeleteMultiple`;

    const body = requestBody({
      Targets: this.parameters.Targets,
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

  parseResponse(_response: Response): Promise<DeleteMultipleResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
