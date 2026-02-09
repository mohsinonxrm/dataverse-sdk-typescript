import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from IsPaiEnabled action
 */
export interface IsPaiEnabledResponse {
  ispaienabled: boolean;
  templates: string;
  arePreviewScenarioEnabled: boolean;
  paigastatus: boolean;
  isdatamodelv2enabled: boolean;
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPaiEnabledResponse> {
    const data = await response.json();
    return data as IsPaiEnabledResponse;
  }
}
