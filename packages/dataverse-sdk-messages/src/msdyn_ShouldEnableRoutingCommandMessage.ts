import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ShouldEnableRoutingCommandResponse as msdyn_ShouldEnableRoutingCommandResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ShouldEnableRoutingCommand message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ShouldEnableRoutingCommandRequestParameters {
  EntityLogicalName: string;
}

/**
 * msdyn_ShouldEnableRoutingCommand request message
 *
 * Web API Action: msdyn_ShouldEnableRoutingCommand
 */
export class msdyn_ShouldEnableRoutingCommandRequest
  extends OrganizationRequest
  implements Executable<msdyn_ShouldEnableRoutingCommandResponse>
{
  declare readonly Parameters: Readonly<msdyn_ShouldEnableRoutingCommandRequestParameters>;

  constructor(parameters: msdyn_ShouldEnableRoutingCommandRequestParameters) {
    super("msdyn_ShouldEnableRoutingCommand", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ShouldEnableRoutingCommand`;

    const body = requestBody({
      EntityLogicalName: this.Parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_ShouldEnableRoutingCommandResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ShouldEnableRoutingCommandResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ShouldEnableRoutingCommand response message
 */
export class msdyn_ShouldEnableRoutingCommandResponse extends OrganizationResponse {
  constructor(public result: msdyn_ShouldEnableRoutingCommandResponseData) {
    super("msdyn_ShouldEnableRoutingCommand");
  }

  static fromResponse(data: unknown): msdyn_ShouldEnableRoutingCommandResponse {
    return new msdyn_ShouldEnableRoutingCommandResponse(
      responseObject<msdyn_ShouldEnableRoutingCommandResponseData>(data)
    );
  }
}
