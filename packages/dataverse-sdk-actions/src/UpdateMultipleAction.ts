import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UpdateMultiple action
 */
export interface UpdateMultipleResponse {
  // No content returned
}

/**
 * Parameters of the UpdateMultiple action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateMultipleActionParameters {
  Targets: Record<string, unknown>[];
}

/**
 * UpdateMultiple action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.crmbaseentity))
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class UpdateMultipleAction implements Executable<UpdateMultipleResponse> {
  constructor(
    public readonly entitySetName: string,
    public readonly parameters: UpdateMultipleActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.UpdateMultiple`;

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

  async parseResponse(response: Response): Promise<UpdateMultipleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UpdateMultipleResponse;
  }
}
