import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * ValidateUnpublished request message
 *
 * Web API Action: ValidateUnpublished
 */
export class ValidateUnpublishedRequest
  extends OrganizationRequest
  implements Executable<ValidateUnpublishedResponse>
{
  constructor(public target: EntityReference | AnyEntityPayload) {
    super("ValidateUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateUnpublished`;

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

  async parseResponse(response: Response): Promise<ValidateUnpublishedResponse> {
    // No return value (204 No Content)
    return new ValidateUnpublishedResponse();
  }
}

/**
 * ValidateUnpublished response message
 */
export class ValidateUnpublishedResponse extends OrganizationResponse {
  constructor() {
    super("ValidateUnpublished");
  }

  static fromResponse(_data: unknown): ValidateUnpublishedResponse {
    return new ValidateUnpublishedResponse();
  }
}
