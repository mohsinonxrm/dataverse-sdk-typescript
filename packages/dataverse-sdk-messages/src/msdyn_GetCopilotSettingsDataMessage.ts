import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetCopilotSettingsDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCopilotSettingsData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCopilotSettingsDataResult {
  "@odata.context"?: string;
  msdyn_output: string;
}

/**
 * msdyn_GetCopilotSettingsData response message
 *
 * `result` is the value the msdyn_GetCopilotSettingsData action returns (see {@link msdyn_GetCopilotSettingsDataResult}).
 */
export class msdyn_GetCopilotSettingsDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCopilotSettingsDataResult) {
    super("msdyn_GetCopilotSettingsData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCopilotSettingsDataResponse {
    return new msdyn_GetCopilotSettingsDataResponse(data as msdyn_GetCopilotSettingsDataResult);
  }
}
