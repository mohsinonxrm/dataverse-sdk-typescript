import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpdateMultiple action
 */
export interface UpdateMultipleResponse {
  // No content returned
}

/**
 * UpdateMultiple action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.crmbaseentity))
 */
export class UpdateMultipleAction implements Executable<UpdateMultipleResponse> {
  constructor(public readonly targets: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateMultiple`;

    const body: Record<string, unknown> = {
      Targets: this.targets,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UpdateMultipleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
