import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetWorkListConfiguration action
 */
export interface msdyn_GetWorkListConfigurationResponse {
  IsEnabledForUser: boolean;
  SettingsInstance: string;
  ViewsList: string;
}

/**
 * msdyn_GetWorkListConfiguration action
 *
 * Unbound action
 */
export class msdyn_GetWorkListConfigurationAction implements Executable<msdyn_GetWorkListConfigurationResponse> {
  constructor(
    public readonly viewtype: string,
    public readonly getData: boolean,
    public readonly defaultViewType: string,
    public readonly queryParams: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWorkListConfiguration`;

    const body: Record<string, unknown> = {
      Viewtype: this.viewtype,
      GetData: this.getData,
      DefaultViewType: this.defaultViewType,
      QueryParams: this.queryParams,
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

  async parseResponse(response: Response): Promise<msdyn_GetWorkListConfigurationResponse> {
    const data = await response.json();
    return data as msdyn_GetWorkListConfigurationResponse;
  }
}
