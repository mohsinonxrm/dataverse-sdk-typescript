import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetCopilotSettingsDataResponse as msdyn_GetCopilotSettingsDataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetCopilotSettingsData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCopilotSettingsDataRequestParameters {
  msdyn_input: string;
}

/**
 * msdyn_GetCopilotSettingsData request message
 *
 * Web API Action: msdyn_GetCopilotSettingsData
 */
export class msdyn_GetCopilotSettingsDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCopilotSettingsDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCopilotSettingsDataRequestParameters>;

  constructor(parameters: msdyn_GetCopilotSettingsDataRequestParameters) {
    super("msdyn_GetCopilotSettingsData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotSettingsData`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetCopilotSettingsDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetCopilotSettingsDataResponse.fromResponse({});
    return msdyn_GetCopilotSettingsDataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetCopilotSettingsData response message
 */
export class msdyn_GetCopilotSettingsDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCopilotSettingsDataResponseData) {
    super("msdyn_GetCopilotSettingsData");
  }

  static fromResponse(data: unknown): msdyn_GetCopilotSettingsDataResponse {
    return new msdyn_GetCopilotSettingsDataResponse(
      responseObject<msdyn_GetCopilotSettingsDataResponseData>(data)
    );
  }
}
