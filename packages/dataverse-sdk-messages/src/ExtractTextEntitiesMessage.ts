import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ExtractTextEntities request message
 *
 * Web API Action: ExtractTextEntities
 */
export class ExtractTextEntitiesRequest
  extends OrganizationRequest
  implements Executable<ExtractTextEntitiesResponse>
{
  constructor(
    public text: string,
    public modelId: string,
    public language: string
  ) {
    super("ExtractTextEntities");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExtractTextEntities`;

    const body: Record<string, unknown> = {
      text: this.text,
      modelId: this.modelId,
      language: this.language,
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

  async parseResponse(response: Response): Promise<ExtractTextEntitiesResponse> {
    const data = await response.json();
    return ExtractTextEntitiesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      text: this.text,
      modelId: this.modelId,
      language: this.language,
    };
  }
}

/**
 * ExtractTextEntities response message
 */
export class ExtractTextEntitiesResponse extends OrganizationResponse {
  constructor(public result: ExtractTextEntitiesResponse) {
    super("ExtractTextEntities");
  }

  static fromResponse(data: unknown): ExtractTextEntitiesResponse {
    return new ExtractTextEntitiesResponse((data as any).value);
  }
}
