import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_CreateAutonomousEmailWrapperResponse as msdyn_CreateAutonomousEmailWrapperResponseData } from "./types/index.js";

/**
 * msdyn_CreateAutonomousEmailWrapper request message
 *
 * Web API Action: msdyn_CreateAutonomousEmailWrapper
 */
export class msdyn_CreateAutonomousEmailWrapperRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateAutonomousEmailWrapperResponse>
{
  constructor(
    public senderEntity: EntityReference,
    public entity: EntityReference,
    public nextSuggestion: string,
    public sourceContextEntity: EntityReference
  ) {
    super("msdyn_CreateAutonomousEmailWrapper");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAutonomousEmailWrapper`;

    const body: Record<string, unknown> = {
      SenderEntity: this.senderEntity,
      Entity: this.entity,
      NextSuggestion: this.nextSuggestion,
      SourceContextEntity: this.sourceContextEntity,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateAutonomousEmailWrapperResponse> {
    const data = await response.json();
    return msdyn_CreateAutonomousEmailWrapperResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateAutonomousEmailWrapper response message
 */
export class msdyn_CreateAutonomousEmailWrapperResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAutonomousEmailWrapperResponseData) {
    super("msdyn_CreateAutonomousEmailWrapper");
  }

  static fromResponse(data: unknown): msdyn_CreateAutonomousEmailWrapperResponse {
    return new msdyn_CreateAutonomousEmailWrapperResponse(
      responseObject<msdyn_CreateAutonomousEmailWrapperResponseData>(data)
    );
  }
}
