import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteMultiple action
 */
export interface DeleteMultipleResponse {
  // No content returned
}

/**
 * DeleteMultiple action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.crmbaseentity))
 */
export class DeleteMultipleAction implements Executable<DeleteMultipleResponse> {
  constructor(public readonly targets: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteMultiple`;

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

  async parseResponse(response: Response): Promise<DeleteMultipleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
