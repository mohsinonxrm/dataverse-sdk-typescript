import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Parameters of the msdyn_OnClosureAgentDisengaged message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OnClosureAgentDisengagedRequestParameters {
  Action: number;
  LastEmailRecord?: EntityReference | EntityPayload<email>;
  Target: EntityReference | AnyEntityPayload;
  Reason: number;
}

/**
 * msdyn_OnClosureAgentDisengaged request message
 *
 * Web API Action: msdyn_OnClosureAgentDisengaged
 */
export class msdyn_OnClosureAgentDisengagedRequest
  extends OrganizationRequest
  implements Executable<msdyn_OnClosureAgentDisengagedResponse>
{
  declare readonly Parameters: Readonly<msdyn_OnClosureAgentDisengagedRequestParameters>;

  constructor(parameters: msdyn_OnClosureAgentDisengagedRequestParameters) {
    super("msdyn_OnClosureAgentDisengaged", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OnClosureAgentDisengaged`;

    const body = requestBody({
      Action: this.Parameters.Action,
      LastEmailRecord: this.Parameters.LastEmailRecord,
      Target: this.Parameters.Target,
      Reason: this.Parameters.Reason,
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

  async parseResponse(response: Response): Promise<msdyn_OnClosureAgentDisengagedResponse> {
    // No return value (204 No Content)
    return new msdyn_OnClosureAgentDisengagedResponse();
  }
}

/**
 * msdyn_OnClosureAgentDisengaged response message
 */
export class msdyn_OnClosureAgentDisengagedResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OnClosureAgentDisengaged");
  }

  static fromResponse(_data: unknown): msdyn_OnClosureAgentDisengagedResponse {
    return new msdyn_OnClosureAgentDisengagedResponse();
  }
}
