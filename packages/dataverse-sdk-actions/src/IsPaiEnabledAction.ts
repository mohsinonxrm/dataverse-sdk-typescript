import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the IsPaiEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsPaiEnabledResponse {
  "@odata.context"?: string;
  arePreviewScenarioEnabled: boolean;
  isdatamodelv2enabled: boolean;
  ispaienabled: boolean;
  paigastatus: boolean;
  templates: string;
}

/**
 * IsPaiEnabled action
 *
 * Unbound action
 */
export class IsPaiEnabledAction implements Executable<IsPaiEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/IsPaiEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPaiEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as IsPaiEnabledResponse;
  }
}
