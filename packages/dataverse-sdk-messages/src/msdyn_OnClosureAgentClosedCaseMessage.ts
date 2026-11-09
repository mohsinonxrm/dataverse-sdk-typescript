import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Parameters of the msdyn_OnClosureAgentClosedCase message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OnClosureAgentClosedCaseRequestParameters {
  Reason: number;
  LastEmailRecord?: EntityReference | EntityPayload<email>;
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_OnClosureAgentClosedCase request message
 *
 * Web API Action: msdyn_OnClosureAgentClosedCase
 */
export class msdyn_OnClosureAgentClosedCaseRequest
  extends OrganizationRequest
  implements Executable<msdyn_OnClosureAgentClosedCaseResponse>
{
  declare readonly Parameters: Readonly<msdyn_OnClosureAgentClosedCaseRequestParameters>;

  constructor(parameters: msdyn_OnClosureAgentClosedCaseRequestParameters) {
    super("msdyn_OnClosureAgentClosedCase", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OnClosureAgentClosedCase`;

    const body = requestBody({
      Reason: this.Parameters.Reason,
      LastEmailRecord: this.Parameters.LastEmailRecord,
      Target: this.Parameters.Target,
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

  parseResponse(_response: Response): Promise<msdyn_OnClosureAgentClosedCaseResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_OnClosureAgentClosedCaseResponse());
  }
}

/**
 * msdyn_OnClosureAgentClosedCase response message
 */
export class msdyn_OnClosureAgentClosedCaseResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OnClosureAgentClosedCase");
  }

  static fromResponse(_data?: unknown): msdyn_OnClosureAgentClosedCaseResponse {
    return new msdyn_OnClosureAgentClosedCaseResponse();
  }
}
