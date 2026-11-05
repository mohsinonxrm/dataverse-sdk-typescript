import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RemoveActiveCustomization request message
 *
 * Web API Action: RemoveActiveCustomization
 */
export class RemoveActiveCustomizationRequest
  extends OrganizationRequest
  implements Executable<RemoveActiveCustomizationResponse>
{
  constructor(
    public logicalName: string,
    public id: string
  ) {
    super("RemoveActiveCustomization");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveActiveCustomization`;

    const body: Record<string, unknown> = {
      LogicalName: this.logicalName,
      Id: this.id,
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

  async parseResponse(response: Response): Promise<RemoveActiveCustomizationResponse> {
    const data = await response.json();
    return RemoveActiveCustomizationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LogicalName: this.logicalName,
      Id: this.id,
    };
  }
}

/**
 * RemoveActiveCustomization response message
 */
export class RemoveActiveCustomizationResponse extends OrganizationResponse {
  constructor(public result: RemoveActiveCustomizationResponse) {
    super("RemoveActiveCustomization");
  }

  static fromResponse(data: unknown): RemoveActiveCustomizationResponse {
    return new RemoveActiveCustomizationResponse((data as any).value);
  }
}
