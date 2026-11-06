import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { RemoveActiveCustomizationResponse as RemoveActiveCustomizationResponseData } from "./types/index.js";

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
}

/**
 * RemoveActiveCustomization response message
 */
export class RemoveActiveCustomizationResponse extends OrganizationResponse {
  constructor(public result: RemoveActiveCustomizationResponseData) {
    super("RemoveActiveCustomization");
  }

  static fromResponse(data: unknown): RemoveActiveCustomizationResponse {
    return new RemoveActiveCustomizationResponse(
      responseObject<RemoveActiveCustomizationResponseData>(data)
    );
  }
}
