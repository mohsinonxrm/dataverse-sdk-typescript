import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getAppConfigByContext action
 */
export interface msdyn_getAppConfigByContextResponse {
  AppConfigurations: string;
  AppConfigurationAssignment: string;
}

/**
 * msdyn_getAppConfigByContext action
 *
 * Unbound action
 */
export class msdyn_getAppConfigByContextAction implements Executable<msdyn_getAppConfigByContextResponse> {
  constructor(
    public readonly appUniqueName: string,
    public readonly userId: string,
    public readonly roles: string,
    public readonly formFactor: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getAppConfigByContext`;

    const body: Record<string, unknown> = {
      AppUniqueName: this.appUniqueName,
      UserId: this.userId,
      Roles: this.roles,
      FormFactor: this.formFactor,
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

  async parseResponse(response: Response): Promise<msdyn_getAppConfigByContextResponse> {
    const data = await response.json();
    return data as msdyn_getAppConfigByContextResponse;
  }
}
