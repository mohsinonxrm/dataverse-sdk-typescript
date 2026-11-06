import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * RevertProduct request message
 *
 * Web API Action: RevertProduct
 */
export class RevertProductRequest
  extends OrganizationRequest
  implements Executable<RevertProductResponse>
{
  constructor(public target: EntityReference | AnyEntityPayload) {
    super("RevertProduct");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevertProduct`;

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

  async parseResponse(response: Response): Promise<RevertProductResponse> {
    // No return value (204 No Content)
    return new RevertProductResponse();
  }
}

/**
 * RevertProduct response message
 */
export class RevertProductResponse extends OrganizationResponse {
  constructor() {
    super("RevertProduct");
  }

  static fromResponse(_data: unknown): RevertProductResponse {
    return new RevertProductResponse();
  }
}
