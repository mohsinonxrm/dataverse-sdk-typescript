import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutoCaseClosureAgentCompleteSna message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutoCaseClosureAgentCompleteSnaRequestParameters {
  msdyn_payload: string;
}

/**
 * msdyn_AutoCaseClosureAgentCompleteSna request message
 *
 * Web API Action: msdyn_AutoCaseClosureAgentCompleteSna
 */
export class msdyn_AutoCaseClosureAgentCompleteSnaRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutoCaseClosureAgentCompleteSnaResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutoCaseClosureAgentCompleteSnaRequestParameters>;

  constructor(parameters: msdyn_AutoCaseClosureAgentCompleteSnaRequestParameters) {
    super("msdyn_AutoCaseClosureAgentCompleteSna", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCaseClosureAgentCompleteSna`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
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

  parseResponse(_response: Response): Promise<msdyn_AutoCaseClosureAgentCompleteSnaResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_AutoCaseClosureAgentCompleteSnaResponse());
  }
}

/**
 * msdyn_AutoCaseClosureAgentCompleteSna response message
 */
export class msdyn_AutoCaseClosureAgentCompleteSnaResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutoCaseClosureAgentCompleteSna");
  }

  static fromResponse(_data?: unknown): msdyn_AutoCaseClosureAgentCompleteSnaResponse {
    return new msdyn_AutoCaseClosureAgentCompleteSnaResponse();
  }
}
