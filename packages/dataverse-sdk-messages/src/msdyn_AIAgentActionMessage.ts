import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_AIAgentActionResponse as msdyn_AIAgentActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AIAgentAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIAgentActionRequestParameters {
  RequestedAction: number;
  SourceForLog?: string;
  Entity: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_AIAgentAction request message
 *
 * Web API Action: msdyn_AIAgentAction
 */
export class msdyn_AIAgentActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AIAgentActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_AIAgentActionRequestParameters>;

  constructor(parameters: msdyn_AIAgentActionRequestParameters) {
    super("msdyn_AIAgentAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIAgentAction`;

    const body = requestBody({
      RequestedAction: this.Parameters.RequestedAction,
      SourceForLog: this.Parameters.SourceForLog,
      Entity: this.Parameters.Entity,
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

  async parseResponse(response: Response): Promise<msdyn_AIAgentActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_AIAgentActionResponse.fromResponse({});
    return msdyn_AIAgentActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_AIAgentAction response message
 */
export class msdyn_AIAgentActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIAgentActionResponseData) {
    super("msdyn_AIAgentAction");
  }

  static fromResponse(data: unknown): msdyn_AIAgentActionResponse {
    return new msdyn_AIAgentActionResponse(responseObject<msdyn_AIAgentActionResponseData>(data));
  }
}
