import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetAutoNumberSeed request message
 *
 * Web API Action: GetAutoNumberSeed
 */
export class GetAutoNumberSeedRequest
  extends OrganizationRequest
  implements Executable<GetAutoNumberSeedResponse>
{
  constructor(
    public entityName: string,
    public attributeName: string
  ) {
    super("GetAutoNumberSeed");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetAutoNumberSeed`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      AttributeName: this.attributeName,
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

  async parseResponse(response: Response): Promise<GetAutoNumberSeedResponse> {
    const data = await response.json();
    return GetAutoNumberSeedResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityName: this.entityName,
      AttributeName: this.attributeName,
    };
  }
}

/**
 * GetAutoNumberSeed response message
 */
export class GetAutoNumberSeedResponse extends OrganizationResponse {
  constructor(public result: GetAutoNumberSeedResponse) {
    super("GetAutoNumberSeed");
  }

  static fromResponse(data: unknown): GetAutoNumberSeedResponse {
    return new GetAutoNumberSeedResponse((data as any).value);
  }
}
