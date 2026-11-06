import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_MigrateSequence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateSequenceRequestParameters {
  MigrationId: string;
}

/**
 * msdyn_MigrateSequence request message
 *
 * Web API Action: msdyn_MigrateSequence
 */
export class msdyn_MigrateSequenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateSequenceResponse>
{
  declare readonly Parameters: Readonly<msdyn_MigrateSequenceRequestParameters>;

  constructor(parameters: msdyn_MigrateSequenceRequestParameters) {
    super("msdyn_MigrateSequence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSequence`;

    const body = requestBody({
      MigrationId: this.Parameters.MigrationId,
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

  parseResponse(_response: Response): Promise<msdyn_MigrateSequenceResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_MigrateSequenceResponse());
  }
}

/**
 * msdyn_MigrateSequence response message
 */
export class msdyn_MigrateSequenceResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_MigrateSequence");
  }

  static fromResponse(_data?: unknown): msdyn_MigrateSequenceResponse {
    return new msdyn_MigrateSequenceResponse();
  }
}
