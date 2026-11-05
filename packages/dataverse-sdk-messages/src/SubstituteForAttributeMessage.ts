import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SubstituteForAttribute request message
 *
 * Web API Action: SubstituteForAttribute
 */
export class SubstituteForAttributeRequest
  extends OrganizationRequest
  implements Executable<SubstituteForAttributeResponse>
{
  constructor(
    public attributeName: string,
    public attributeContent: string,
    public subStore: string
  ) {
    super("SubstituteForAttribute");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForAttribute`;

    const body: Record<string, unknown> = {
      AttributeName: this.attributeName,
      AttributeContent: this.attributeContent,
      SubStore: this.subStore,
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

  async parseResponse(response: Response): Promise<SubstituteForAttributeResponse> {
    const data = await response.json();
    return SubstituteForAttributeResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AttributeName: this.attributeName,
      AttributeContent: this.attributeContent,
      SubStore: this.subStore,
    };
  }
}

/**
 * SubstituteForAttribute response message
 */
export class SubstituteForAttributeResponse extends OrganizationResponse {
  constructor(public result: SubstituteForAttributeResponse) {
    super("SubstituteForAttribute");
  }

  static fromResponse(data: unknown): SubstituteForAttributeResponse {
    return new SubstituteForAttributeResponse((data as any).value);
  }
}
