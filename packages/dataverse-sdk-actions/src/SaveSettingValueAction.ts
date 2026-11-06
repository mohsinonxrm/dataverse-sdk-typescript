import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SaveSettingValue action
 */
export interface SaveSettingValueResponse {
  // No content returned
}

/**
 * SaveSettingValue action
 *
 * Unbound action
 */
export class SaveSettingValueAction implements Executable<SaveSettingValueResponse> {
  constructor(
    public readonly appUniqueName: string | undefined,
    public readonly settingName: string,
    public readonly value: string,
    public readonly solutionUniqueName?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SaveSettingValue`;

    const body: Record<string, unknown> = {
      AppUniqueName: this.appUniqueName,
      SettingName: this.settingName,
      Value: this.value,
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<SaveSettingValueResponse> {
    // No return value (204 No Content)
    return {};
  }
}
