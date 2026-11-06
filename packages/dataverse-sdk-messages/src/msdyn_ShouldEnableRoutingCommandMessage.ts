import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ShouldEnableRoutingCommandResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ShouldEnableRoutingCommand action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ShouldEnableRoutingCommandResult {
  "@odata.context"?: string;
  EnableRoutingCommand: boolean;
}

/**
 * msdyn_ShouldEnableRoutingCommand response message
 *
 * `result` is the value the msdyn_ShouldEnableRoutingCommand action returns (see {@link msdyn_ShouldEnableRoutingCommandResult}).
 */
export class msdyn_ShouldEnableRoutingCommandResponse extends OrganizationResponse {
  constructor(public result: msdyn_ShouldEnableRoutingCommandResult) {
    super("msdyn_ShouldEnableRoutingCommand");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ShouldEnableRoutingCommandResponse {
    return new msdyn_ShouldEnableRoutingCommandResponse(
      data as msdyn_ShouldEnableRoutingCommandResult
    );
  }
}
