import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GetAutoNumberSeedResponse as GetAutoNumberSeedResponseData } from "./types/index.js";

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
}

/**
 * GetAutoNumberSeed response message
 */
export class GetAutoNumberSeedResponse extends OrganizationResponse {
  constructor(public result: GetAutoNumberSeedResponseData) {
    super("GetAutoNumberSeed");
  }

  static fromResponse(data: unknown): GetAutoNumberSeedResponse {
    return new GetAutoNumberSeedResponse(responseObject<GetAutoNumberSeedResponseData>(data));
  }
}
