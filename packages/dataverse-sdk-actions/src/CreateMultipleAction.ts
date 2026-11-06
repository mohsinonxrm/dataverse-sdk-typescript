import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CreateMultiple action
 */
export interface CreateMultipleResponse {
  Ids: string[];
}

/**
 * Parameters of the CreateMultiple action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateMultipleActionParameters {
  Targets: Record<string, unknown>[];
}

/**
 * CreateMultiple action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.crmbaseentity))
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class CreateMultipleAction implements Executable<CreateMultipleResponse> {
  constructor(
    public readonly entitySetName: string,
    public readonly parameters: CreateMultipleActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple`;

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

  async parseResponse(response: Response): Promise<CreateMultipleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CreateMultipleResponse;
    return (await response.json()) as CreateMultipleResponse;
  }
}
