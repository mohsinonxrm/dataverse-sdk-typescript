import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CanBeReferencedResponse as CanBeReferencedResponseData } from "./types/index.js";

/**
 * CanBeReferenced request message
 *
 * Web API Action: CanBeReferenced
 */
export class CanBeReferencedRequest
  extends OrganizationRequest
  implements Executable<CanBeReferencedResponse>
{
  constructor(public entityName: string) {
    super("CanBeReferenced");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferenced`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
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

  async parseResponse(response: Response): Promise<CanBeReferencedResponse> {
    const data = await response.json();
    return CanBeReferencedResponse.fromResponse(data);
  }
}

/**
 * CanBeReferenced response message
 */
export class CanBeReferencedResponse extends OrganizationResponse {
  constructor(public result: CanBeReferencedResponseData) {
    super("CanBeReferenced");
  }

  static fromResponse(data: unknown): CanBeReferencedResponse {
    return new CanBeReferencedResponse(responseObject<CanBeReferencedResponseData>(data));
  }
}
