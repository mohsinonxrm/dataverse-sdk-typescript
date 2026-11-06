import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_MigrateSequence request message
 *
 * Web API Action: msdyn_MigrateSequence
 */
export class msdyn_MigrateSequenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateSequenceResponse>
{
  constructor(public migrationId: string) {
    super("msdyn_MigrateSequence");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSequence`;

    const body: Record<string, unknown> = {
      MigrationId: this.migrationId,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateSequenceResponse> {
    // No return value (204 No Content)
    return new msdyn_MigrateSequenceResponse();
  }
}

/**
 * msdyn_MigrateSequence response message
 */
export class msdyn_MigrateSequenceResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_MigrateSequence");
  }

  static fromResponse(_data: unknown): msdyn_MigrateSequenceResponse {
    return new msdyn_MigrateSequenceResponse();
  }
}
