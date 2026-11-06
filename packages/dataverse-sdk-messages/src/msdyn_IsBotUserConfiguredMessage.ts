import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IsBotUserConfigured message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IsBotUserConfiguredRequestParameters {
  BotApplicationId: string;
}

/**
 * msdyn_IsBotUserConfigured request message
 *
 * Web API Action: msdyn_IsBotUserConfigured
 */
export class msdyn_IsBotUserConfiguredRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsBotUserConfiguredResponse>
{
  declare readonly Parameters: Readonly<msdyn_IsBotUserConfiguredRequestParameters>;

  constructor(parameters: msdyn_IsBotUserConfiguredRequestParameters) {
    super("msdyn_IsBotUserConfigured", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsBotUserConfigured`;

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

  async parseResponse(response: Response): Promise<msdyn_IsBotUserConfiguredResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IsBotUserConfiguredResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IsBotUserConfigured action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsBotUserConfiguredResult {
  "@odata.context"?: string;
  IsConfigurationValid: boolean;
}

/**
 * msdyn_IsBotUserConfigured response message
 *
 * `result` is the value the msdyn_IsBotUserConfigured action returns (see {@link msdyn_IsBotUserConfiguredResult}).
 */
export class msdyn_IsBotUserConfiguredResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsBotUserConfiguredResult) {
    super("msdyn_IsBotUserConfigured");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IsBotUserConfiguredResponse {
    return new msdyn_IsBotUserConfiguredResponse(data as msdyn_IsBotUserConfiguredResult);
  }
}
