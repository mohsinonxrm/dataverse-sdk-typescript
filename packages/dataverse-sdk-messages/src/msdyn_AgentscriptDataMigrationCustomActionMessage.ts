import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AgentscriptDataMigrationCustomAction request message
 *
 * Web API Action: msdyn_AgentscriptDataMigrationCustomAction
 */
export class msdyn_AgentscriptDataMigrationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AgentscriptDataMigrationCustomActionResponse>
{
  constructor() {
    super("msdyn_AgentscriptDataMigrationCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AgentscriptDataMigrationCustomAction`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_AgentscriptDataMigrationCustomActionResponse> {
    // No return value (204 No Content)
    return new msdyn_AgentscriptDataMigrationCustomActionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_AgentscriptDataMigrationCustomAction response message
 */
export class msdyn_AgentscriptDataMigrationCustomActionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AgentscriptDataMigrationCustomAction");
  }

  static fromResponse(_data: unknown): msdyn_AgentscriptDataMigrationCustomActionResponse {
    return new msdyn_AgentscriptDataMigrationCustomActionResponse();
  }
}
