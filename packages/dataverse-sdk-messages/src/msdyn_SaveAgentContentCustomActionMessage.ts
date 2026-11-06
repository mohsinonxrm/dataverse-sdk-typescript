import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SaveAgentContentCustomActionResponse as msdyn_SaveAgentContentCustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SaveAgentContentCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveAgentContentCustomActionRequestParameters {
  AgentContent?: string;
}

/**
 * msdyn_SaveAgentContentCustomAction request message
 *
 * Web API Action: msdyn_SaveAgentContentCustomAction
 */
export class msdyn_SaveAgentContentCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveAgentContentCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveAgentContentCustomActionRequestParameters>;

  constructor(parameters: msdyn_SaveAgentContentCustomActionRequestParameters = {}) {
    super("msdyn_SaveAgentContentCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveAgentContentCustomAction`;

    const body = requestBody({
      AgentContent: this.Parameters.AgentContent,
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

  async parseResponse(response: Response): Promise<msdyn_SaveAgentContentCustomActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SaveAgentContentCustomActionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SaveAgentContentCustomAction response message
 */
export class msdyn_SaveAgentContentCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveAgentContentCustomActionResponseData) {
    super("msdyn_SaveAgentContentCustomAction");
  }

  static fromResponse(data: unknown): msdyn_SaveAgentContentCustomActionResponse {
    return new msdyn_SaveAgentContentCustomActionResponse(
      responseObject<msdyn_SaveAgentContentCustomActionResponseData>(data)
    );
  }
}
