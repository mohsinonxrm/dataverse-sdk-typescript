import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetNextAutoNumberValue request message
 *
 * Web API Action: GetNextAutoNumberValue
 */
export class GetNextAutoNumberValueRequest
  extends OrganizationRequest
  implements Executable<GetNextAutoNumberValueResponse>
{
  constructor(
    public entityName: string,
    public attributeName: string
  ) {
    super("GetNextAutoNumberValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetNextAutoNumberValue`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      AttributeName: this.attributeName,
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

  async parseResponse(response: Response): Promise<GetNextAutoNumberValueResponse> {
    const data = await response.json();
    return GetNextAutoNumberValueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityName: this.entityName,
      AttributeName: this.attributeName,
    };
  }
}

/**
 * GetNextAutoNumberValue response message
 */
export class GetNextAutoNumberValueResponse extends OrganizationResponse {
  constructor(public result: GetNextAutoNumberValueResponse) {
    super("GetNextAutoNumberValue");
  }

  static fromResponse(data: unknown): GetNextAutoNumberValueResponse {
    return new GetNextAutoNumberValueResponse((data as any).value);
  }
}
