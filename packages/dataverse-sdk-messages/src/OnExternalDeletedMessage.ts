import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the OnExternalDeleted message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnExternalDeletedRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * OnExternalDeleted request message
 *
 * Web API Action: OnExternalDeleted
 */
export class OnExternalDeletedRequest
  extends OrganizationRequest
  implements Executable<OnExternalDeletedResponse>
{
  declare readonly Parameters: Readonly<OnExternalDeletedRequestParameters>;

  constructor(parameters: OnExternalDeletedRequestParameters) {
    super("OnExternalDeleted", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalDeleted`;

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

  async parseResponse(response: Response): Promise<OnExternalDeletedResponse> {
    // No return value (204 No Content)
    return new OnExternalDeletedResponse();
  }
}

/**
 * OnExternalDeleted response message
 */
export class OnExternalDeletedResponse extends OrganizationResponse {
  constructor() {
    super("OnExternalDeleted");
  }

  static fromResponse(_data: unknown): OnExternalDeletedResponse {
    return new OnExternalDeletedResponse();
  }
}
