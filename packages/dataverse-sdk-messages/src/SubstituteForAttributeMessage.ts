import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { SubstituteForAttributeResponse as SubstituteForAttributeResponseData } from "./types/index.js";

/**
 * Parameters of the SubstituteForAttribute message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SubstituteForAttributeRequestParameters {
  AttributeName: string;
  AttributeContent: string;
  SubStore: string;
}

/**
 * SubstituteForAttribute request message
 *
 * Web API Action: SubstituteForAttribute
 */
export class SubstituteForAttributeRequest
  extends OrganizationRequest
  implements Executable<SubstituteForAttributeResponse>
{
  declare readonly Parameters: Readonly<SubstituteForAttributeRequestParameters>;

  constructor(parameters: SubstituteForAttributeRequestParameters) {
    super("SubstituteForAttribute", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForAttribute`;

    const body = requestBody({
      AttributeName: this.Parameters.AttributeName,
      AttributeContent: this.Parameters.AttributeContent,
      SubStore: this.Parameters.SubStore,
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

  async parseResponse(response: Response): Promise<SubstituteForAttributeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return SubstituteForAttributeResponse.fromResponse({});
    return SubstituteForAttributeResponse.fromResponse(await response.json());
  }
}

/**
 * SubstituteForAttribute response message
 */
export class SubstituteForAttributeResponse extends OrganizationResponse {
  constructor(public result: SubstituteForAttributeResponseData) {
    super("SubstituteForAttribute");
  }

  static fromResponse(data: unknown): SubstituteForAttributeResponse {
    return new SubstituteForAttributeResponse(
      responseObject<SubstituteForAttributeResponseData>(data)
    );
  }
}
