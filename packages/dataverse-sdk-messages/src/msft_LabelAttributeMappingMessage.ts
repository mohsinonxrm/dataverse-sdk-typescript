import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msft_LabelAttributeMapping request message
 *
 * Web API Action: msft_LabelAttributeMapping
 */
export class msft_LabelAttributeMappingRequest
  extends OrganizationRequest
  implements Executable<msft_LabelAttributeMappingResponse>
{
  constructor(public entityId: string) {
    super("msft_LabelAttributeMapping");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_LabelAttributeMapping`;

    const body: Record<string, unknown> = {
      EntityId: this.entityId,
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

  async parseResponse(response: Response): Promise<msft_LabelAttributeMappingResponse> {
    const data = await response.json();
    return msft_LabelAttributeMappingResponse.fromResponse(data);
  }
}

/**
 * msft_LabelAttributeMapping response message
 */
export class msft_LabelAttributeMappingResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msft_LabelAttributeMapping");
  }

  static fromResponse(data: unknown): msft_LabelAttributeMappingResponse {
    return new msft_LabelAttributeMappingResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
