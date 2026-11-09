import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_QuickSetupCMA message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_QuickSetupCMARequestParameters {
  BotConversationId?: string;
  Fields: string;
}

/**
 * msdyn_QuickSetupCMA request message
 *
 * Web API Action: msdyn_QuickSetupCMA
 */
export class msdyn_QuickSetupCMARequest
  extends OrganizationRequest
  implements Executable<msdyn_QuickSetupCMAResponse>
{
  declare readonly Parameters: Readonly<msdyn_QuickSetupCMARequestParameters>;

  constructor(parameters: msdyn_QuickSetupCMARequestParameters) {
    super("msdyn_QuickSetupCMA", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QuickSetupCMA`;

    const body = requestBody({
      BotConversationId: this.Parameters.BotConversationId,
      Fields: this.Parameters.Fields,
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

  async parseResponse(response: Response): Promise<msdyn_QuickSetupCMAResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_QuickSetupCMAResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_QuickSetupCMA action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_QuickSetupCMAResult {
  "@odata.context"?: string;
  FieldsForPrediction: string;
  SettingsLink: string;
}

/**
 * msdyn_QuickSetupCMA response message
 *
 * `result` is the value the msdyn_QuickSetupCMA action returns (see {@link msdyn_QuickSetupCMAResult}).
 */
export class msdyn_QuickSetupCMAResponse extends OrganizationResponse {
  constructor(public result: msdyn_QuickSetupCMAResult) {
    super("msdyn_QuickSetupCMA");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_QuickSetupCMAResponse {
    return new msdyn_QuickSetupCMAResponse(data as msdyn_QuickSetupCMAResult);
  }
}
