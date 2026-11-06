import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the RevertProduct message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RevertProductRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * RevertProduct request message
 *
 * Web API Action: RevertProduct
 */
export class RevertProductRequest
  extends OrganizationRequest
  implements Executable<RevertProductResponse>
{
  declare readonly Parameters: Readonly<RevertProductRequestParameters>;

  constructor(parameters: RevertProductRequestParameters) {
    super("RevertProduct", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevertProduct`;

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

  parseResponse(_response: Response): Promise<RevertProductResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new RevertProductResponse());
  }
}

/**
 * RevertProduct response message
 */
export class RevertProductResponse extends OrganizationResponse {
  constructor() {
    super("RevertProduct");
  }

  static fromResponse(_data?: unknown): RevertProductResponse {
    return new RevertProductResponse();
  }
}
