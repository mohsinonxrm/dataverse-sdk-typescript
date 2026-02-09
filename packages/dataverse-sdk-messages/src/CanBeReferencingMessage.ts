import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CanBeReferencingResponse> {
    const data = await response.json();
    return CanBeReferencingResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityName: this.entityName,
    };
  }
}

/**
 * CanBeReferencing response message
 */
export class CanBeReferencingResponse extends OrganizationResponse {
  constructor(public result: CanBeReferencingResponse) {
    super("CanBeReferencing");
  }

  static fromResponse(data: unknown): CanBeReferencingResponse {
    return new CanBeReferencingResponse((data as any).value);
  }
}
