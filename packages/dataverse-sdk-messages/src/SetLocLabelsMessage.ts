import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { LocalizedLabel } from "./types/index.js";

/**
 * Parameters of the SetLocLabels message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetLocLabelsRequestParameters {
  EntityMoniker: EntityReference | AnyEntityPayload;
  AttributeName: string;
  Labels?: LocalizedLabel[];
}

/**
 * SetLocLabels request message
 *
 * Web API Action: SetLocLabels
 */
export class SetLocLabelsRequest
  extends OrganizationRequest
  implements Executable<SetLocLabelsResponse>
{
  declare readonly Parameters: Readonly<SetLocLabelsRequestParameters>;

  constructor(parameters: SetLocLabelsRequestParameters) {
    super("SetLocLabels", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetLocLabels`;

    const body = requestBody({
      EntityMoniker: this.Parameters.EntityMoniker,
      AttributeName: this.Parameters.AttributeName,
      Labels: this.Parameters.Labels,
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

  parseResponse(_response: Response): Promise<SetLocLabelsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new SetLocLabelsResponse());
  }
}

/**
 * SetLocLabels response message
 */
export class SetLocLabelsResponse extends OrganizationResponse {
  constructor() {
    super("SetLocLabels");
  }

  static fromResponse(_data?: unknown): SetLocLabelsResponse {
    return new SetLocLabelsResponse();
  }
}
