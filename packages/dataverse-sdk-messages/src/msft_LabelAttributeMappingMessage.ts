import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msft_LabelAttributeMapping message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_LabelAttributeMappingRequestParameters {
  EntityId: string;
}

/**
 * msft_LabelAttributeMapping request message
 *
 * Web API Action: msft_LabelAttributeMapping
 */
export class msft_LabelAttributeMappingRequest
  extends OrganizationRequest
  implements Executable<msft_LabelAttributeMappingResponse>
{
  declare readonly Parameters: Readonly<msft_LabelAttributeMappingRequestParameters>;

  constructor(parameters: msft_LabelAttributeMappingRequestParameters) {
    super("msft_LabelAttributeMapping", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_LabelAttributeMapping`;

    const body = requestBody({
      EntityId: this.Parameters.EntityId,
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

  async parseResponse(response: Response): Promise<msft_LabelAttributeMappingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msft_LabelAttributeMappingResponse.fromResponse({});
    return msft_LabelAttributeMappingResponse.fromResponse(await response.json());
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
