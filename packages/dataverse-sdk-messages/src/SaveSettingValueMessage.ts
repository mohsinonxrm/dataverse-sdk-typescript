import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SaveSettingValue request message
 *
 * Web API Action: SaveSettingValue
 */
export class SaveSettingValueRequest
  extends OrganizationRequest
  implements Executable<SaveSettingValueResponse>
{
  constructor(
    public appUniqueName: string,
    public settingName: string,
    public value: string,
    public solutionUniqueName: string
  ) {
    super("SaveSettingValue");
  }

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
    return new SaveSettingValueResponse();
  }
}

/**
 * SaveSettingValue response message
 */
export class SaveSettingValueResponse extends OrganizationResponse {
  constructor() {
    super("SaveSettingValue");
  }

  static fromResponse(_data: unknown): SaveSettingValueResponse {
    return new SaveSettingValueResponse();
  }
}
