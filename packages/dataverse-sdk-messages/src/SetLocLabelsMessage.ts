import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { LocalizedLabel } from "./types/index.js";

/**
 * SetLocLabels request message
 *
 * Web API Action: SetLocLabels
 */
export class SetLocLabelsRequest
  extends OrganizationRequest
  implements Executable<SetLocLabelsResponse>
{
  constructor(
    public entityMoniker: EntityReference,
    public attributeName: string,
    public labels: LocalizedLabel[]
  ) {
    super("SetLocLabels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetLocLabels`;

    const body: Record<string, unknown> = {
      EntityMoniker: this.entityMoniker,
      AttributeName: this.attributeName,
      Labels: this.labels,
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

  async parseResponse(response: Response): Promise<SetLocLabelsResponse> {
    // No return value (204 No Content)
    return new SetLocLabelsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityMoniker: this.entityMoniker,
      AttributeName: this.attributeName,
      Labels: this.labels,
    };
  }
}

/**
 * SetLocLabels response message
 */
export class SetLocLabelsResponse extends OrganizationResponse {
  constructor() {
    super("SetLocLabels");
  }

  static fromResponse(_data: unknown): SetLocLabelsResponse {
    return new SetLocLabelsResponse();
  }
}
