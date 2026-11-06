import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_QuickSetupCMAResponse as msdyn_QuickSetupCMAResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_QuickSetupCMAResponse.fromResponse({});
    return msdyn_QuickSetupCMAResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_QuickSetupCMA response message
 */
export class msdyn_QuickSetupCMAResponse extends OrganizationResponse {
  constructor(public result: msdyn_QuickSetupCMAResponseData) {
    super("msdyn_QuickSetupCMA");
  }

  static fromResponse(data: unknown): msdyn_QuickSetupCMAResponse {
    return new msdyn_QuickSetupCMAResponse(responseObject<msdyn_QuickSetupCMAResponseData>(data));
  }
}
