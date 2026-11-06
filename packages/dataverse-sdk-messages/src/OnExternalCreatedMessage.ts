import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the OnExternalCreated message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnExternalCreatedRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * OnExternalCreated request message
 *
 * Web API Action: OnExternalCreated
 */
export class OnExternalCreatedRequest
  extends OrganizationRequest
  implements Executable<OnExternalCreatedResponse>
{
  declare readonly Parameters: Readonly<OnExternalCreatedRequestParameters>;

  constructor(parameters: OnExternalCreatedRequestParameters) {
    super("OnExternalCreated", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalCreated`;

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

  async parseResponse(response: Response): Promise<OnExternalCreatedResponse> {
    // No return value (204 No Content)
    return new OnExternalCreatedResponse();
  }
}

/**
 * OnExternalCreated response message
 */
export class OnExternalCreatedResponse extends OrganizationResponse {
  constructor() {
    super("OnExternalCreated");
  }

  static fromResponse(_data: unknown): OnExternalCreatedResponse {
    return new OnExternalCreatedResponse();
  }
}
