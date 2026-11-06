import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetBotConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBotConfigurationRequestParameters {
  BotApplicationId: string;
}

/**
 * msdyn_GetBotConfiguration request message
 *
 * Web API Action: msdyn_GetBotConfiguration
 */
export class msdyn_GetBotConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBotConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetBotConfigurationRequestParameters>;

  constructor(parameters: msdyn_GetBotConfigurationRequestParameters) {
    super("msdyn_GetBotConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBotConfiguration`;

    const body = requestBody({
      BotApplicationId: this.Parameters.BotApplicationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetBotConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetBotConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetBotConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetBotConfigurationResult {
  "@odata.context"?: string;
  ConfigRelativeUrl: string;
  ConfigurationState: number;
  ErrorCode: number;
  ErrorDescription: string;
  IsConfigured: boolean;
  RecordId: string;
}

/**
 * msdyn_GetBotConfiguration response message
 *
 * `result` is the value the msdyn_GetBotConfiguration action returns (see {@link msdyn_GetBotConfigurationResult}).
 */
export class msdyn_GetBotConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBotConfigurationResult) {
    super("msdyn_GetBotConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetBotConfigurationResponse {
    return new msdyn_GetBotConfigurationResponse(data as msdyn_GetBotConfigurationResult);
  }
}
