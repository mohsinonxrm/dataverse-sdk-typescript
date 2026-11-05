import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CanBeReferencingResponse as CanBeReferencingResponseData } from "./types/index.js";

/**
 * CanBeReferencing request message
 *
 * Web API Action: CanBeReferencing
 */
export class CanBeReferencingRequest
  extends OrganizationRequest
  implements Executable<CanBeReferencingResponse>
{
  constructor(public entityName: string) {
    super("CanBeReferencing");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferencing`;

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

  async parseResponse(response: Response): Promise<CanBeReferencingResponse> {
    const data = await response.json();
    return CanBeReferencingResponse.fromResponse(data);
  }
}

/**
 * CanBeReferencing response message
 */
export class CanBeReferencingResponse extends OrganizationResponse {
  constructor(public result: CanBeReferencingResponseData) {
    super("CanBeReferencing");
  }

  static fromResponse(data: unknown): CanBeReferencingResponse {
    return new CanBeReferencingResponse(responseObject<CanBeReferencingResponseData>(data));
  }
}
