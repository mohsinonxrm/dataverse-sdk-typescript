import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the ValidateUnpublished message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateUnpublishedRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ValidateUnpublished request message
 *
 * Web API Action: ValidateUnpublished
 */
export class ValidateUnpublishedRequest
  extends OrganizationRequest
  implements Executable<ValidateUnpublishedResponse>
{
  declare readonly Parameters: Readonly<ValidateUnpublishedRequestParameters>;

  constructor(parameters: ValidateUnpublishedRequestParameters) {
    super("ValidateUnpublished", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateUnpublished`;

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

  parseResponse(_response: Response): Promise<ValidateUnpublishedResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ValidateUnpublishedResponse());
  }
}

/**
 * ValidateUnpublished response message
 */
export class ValidateUnpublishedResponse extends OrganizationResponse {
  constructor() {
    super("ValidateUnpublished");
  }

  static fromResponse(_data?: unknown): ValidateUnpublishedResponse {
    return new ValidateUnpublishedResponse();
  }
}
