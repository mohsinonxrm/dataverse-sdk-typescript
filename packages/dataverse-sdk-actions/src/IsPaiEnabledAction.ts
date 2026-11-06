import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from IsPaiEnabled action
 */
export interface IsPaiEnabledResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as IsPaiEnabledResponse;
    return (await response.json()) as IsPaiEnabledResponse;
  }
}
