import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ShouldEnableRoutingCommand request message
 *
 * Web API Action: msdyn_ShouldEnableRoutingCommand
 */
export class msdyn_ShouldEnableRoutingCommandRequest
  extends OrganizationRequest
  implements Executable<msdyn_ShouldEnableRoutingCommandResponse>
{
  constructor(public entityLogicalName: string) {
    super("msdyn_ShouldEnableRoutingCommand");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ShouldEnableRoutingCommand`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_ShouldEnableRoutingCommandResponse> {
    const data = await response.json();
    return msdyn_ShouldEnableRoutingCommandResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityLogicalName: this.entityLogicalName,
    };
  }
}

/**
 * msdyn_ShouldEnableRoutingCommand response message
 */
export class msdyn_ShouldEnableRoutingCommandResponse extends OrganizationResponse {
  constructor(public result: msdyn_ShouldEnableRoutingCommandResponse) {
    super("msdyn_ShouldEnableRoutingCommand");
  }

  static fromResponse(data: unknown): msdyn_ShouldEnableRoutingCommandResponse {
    return new msdyn_ShouldEnableRoutingCommandResponse((data as any).value);
  }
}
