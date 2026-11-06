import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SaveSettingValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SaveSettingValueRequestParameters {
  AppUniqueName?: string;
  SettingName: string;
  Value: string;
  SolutionUniqueName?: string;
}

/**
 * SaveSettingValue request message
 *
 * Web API Action: SaveSettingValue
 */
export class SaveSettingValueRequest
  extends OrganizationRequest
  implements Executable<SaveSettingValueResponse>
{
  declare readonly Parameters: Readonly<SaveSettingValueRequestParameters>;

  constructor(parameters: SaveSettingValueRequestParameters) {
    super("SaveSettingValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SaveSettingValue`;

    const body = requestBody({
      AppUniqueName: this.Parameters.AppUniqueName,
      SettingName: this.Parameters.SettingName,
      Value: this.Parameters.Value,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
    });

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
