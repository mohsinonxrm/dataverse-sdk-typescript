import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the OnExternalUpdated message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnExternalUpdatedRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  PreImage?: EntityReference | AnyEntityPayload;
  ChangedFields?: string[];
}

/**
 * OnExternalUpdated request message
 *
 * Web API Action: OnExternalUpdated
 */
export class OnExternalUpdatedRequest
  extends OrganizationRequest
  implements Executable<OnExternalUpdatedResponse>
{
  declare readonly Parameters: Readonly<OnExternalUpdatedRequestParameters>;

  constructor(parameters: OnExternalUpdatedRequestParameters) {
    super("OnExternalUpdated", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalUpdated`;

    const body = requestBody({
      Target: this.Parameters.Target,
      PreImage: this.Parameters.PreImage,
      ChangedFields: this.Parameters.ChangedFields,
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

  async parseResponse(response: Response): Promise<OnExternalUpdatedResponse> {
    // No return value (204 No Content)
    return new OnExternalUpdatedResponse();
  }
}

/**
 * OnExternalUpdated response message
 */
export class OnExternalUpdatedResponse extends OrganizationResponse {
  constructor() {
    super("OnExternalUpdated");
  }

  static fromResponse(_data: unknown): OnExternalUpdatedResponse {
    return new OnExternalUpdatedResponse();
  }
}
