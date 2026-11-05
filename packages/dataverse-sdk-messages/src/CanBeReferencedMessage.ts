import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      EntityName: this.entityName,
    };
  }
}

/**
 * CanBeReferenced response message
 */
export class CanBeReferencedResponse extends OrganizationResponse {
  constructor(public result: CanBeReferencedResponse) {
    super("CanBeReferenced");
  }

  static fromResponse(data: unknown): CanBeReferencedResponse {
    return new CanBeReferencedResponse((data as any).value);
  }
}
