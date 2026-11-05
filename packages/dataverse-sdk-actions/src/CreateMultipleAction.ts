import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CreateMultiple action
 */
export interface CreateMultipleResponse {
  Ids: string[];
}

/**
 * CreateMultiple action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.crmbaseentity))
 */
export class CreateMultipleAction implements Executable<CreateMultipleResponse> {
  constructor(public readonly targets: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateMultiple`;

    const body: Record<string, unknown> = {
      Targets: this.targets,
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

  async parseResponse(response: Response): Promise<CreateMultipleResponse> {
    const data = await response.json();
    return data as CreateMultipleResponse;
  }
}
