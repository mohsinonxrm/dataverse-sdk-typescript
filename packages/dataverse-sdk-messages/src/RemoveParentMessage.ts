import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * RemoveParent request message
 *
 * Web API Action: RemoveParent
 */
export class RemoveParentRequest
  extends OrganizationRequest
  implements Executable<RemoveParentResponse>
{
  constructor(public target: EntityReference) {
    super("RemoveParent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveParent`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<RemoveParentResponse> {
    // No return value (204 No Content)
    return new RemoveParentResponse();
  }
}

/**
 * RemoveParent response message
 */
export class RemoveParentResponse extends OrganizationResponse {
  constructor() {
    super("RemoveParent");
  }

  static fromResponse(_data: unknown): RemoveParentResponse {
    return new RemoveParentResponse();
  }
}
