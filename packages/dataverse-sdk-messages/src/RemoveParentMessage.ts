import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the RemoveParent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveParentRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * RemoveParent request message
 *
 * Web API Action: RemoveParent
 */
export class RemoveParentRequest
  extends OrganizationRequest
  implements Executable<RemoveParentResponse>
{
  declare readonly Parameters: Readonly<RemoveParentRequestParameters>;

  constructor(parameters: RemoveParentRequestParameters) {
    super("RemoveParent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveParent`;

    const body = requestBody({
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

  parseResponse(_response: Response): Promise<RemoveParentResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new RemoveParentResponse());
  }
}

/**
 * RemoveParent response message
 */
export class RemoveParentResponse extends OrganizationResponse {
  constructor() {
    super("RemoveParent");
  }

  static fromResponse(_data?: unknown): RemoveParentResponse {
    return new RemoveParentResponse();
  }
}
