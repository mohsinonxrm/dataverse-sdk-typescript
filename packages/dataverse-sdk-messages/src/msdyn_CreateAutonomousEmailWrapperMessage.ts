import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateAutonomousEmailWrapperResponse> {
    const data = await response.json();
    return msdyn_CreateAutonomousEmailWrapperResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SenderEntity: this.senderEntity,
      Entity: this.entity,
      NextSuggestion: this.nextSuggestion,
      SourceContextEntity: this.sourceContextEntity,
    };
  }
}

/**
 * msdyn_CreateAutonomousEmailWrapper response message
 */
export class msdyn_CreateAutonomousEmailWrapperResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAutonomousEmailWrapperResponse) {
    super("msdyn_CreateAutonomousEmailWrapper");
  }

  static fromResponse(data: unknown): msdyn_CreateAutonomousEmailWrapperResponse {
    return new msdyn_CreateAutonomousEmailWrapperResponse((data as any).value);
  }
}
