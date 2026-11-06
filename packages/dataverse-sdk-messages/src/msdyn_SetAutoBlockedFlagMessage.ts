import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ocflaggedspam } from "./types/index.js";

/**
 * Parameters of the msdyn_SetAutoBlockedFlag message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetAutoBlockedFlagRequestParameters {
  FlaggedSpamEntity: EntityReference | EntityPayload<msdyn_ocflaggedspam>;
}

/**
 * msdyn_SetAutoBlockedFlag request message
 *
 * Web API Action: msdyn_SetAutoBlockedFlag
 */
export class msdyn_SetAutoBlockedFlagRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetAutoBlockedFlagResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetAutoBlockedFlagRequestParameters>;

  constructor(parameters: msdyn_SetAutoBlockedFlagRequestParameters) {
    super("msdyn_SetAutoBlockedFlag", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetAutoBlockedFlag`;

    const body = requestBody({
      FlaggedSpamEntity: this.Parameters.FlaggedSpamEntity,
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

  parseResponse(_response: Response): Promise<msdyn_SetAutoBlockedFlagResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SetAutoBlockedFlagResponse());
  }
}

/**
 * msdyn_SetAutoBlockedFlag response message
 */
export class msdyn_SetAutoBlockedFlagResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SetAutoBlockedFlag");
  }

  static fromResponse(_data?: unknown): msdyn_SetAutoBlockedFlagResponse {
    return new msdyn_SetAutoBlockedFlagResponse();
  }
}
