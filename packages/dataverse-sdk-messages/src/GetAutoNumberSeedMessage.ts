import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetAutoNumberSeedResponse as GetAutoNumberSeedResponseData } from "./types/index.js";

/**
 * Parameters of the GetAutoNumberSeed message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetAutoNumberSeedRequestParameters {
  EntityName: string;
  AttributeName: string;
}

/**
 * GetAutoNumberSeed request message
 *
 * Web API Action: GetAutoNumberSeed
 */
export class GetAutoNumberSeedRequest
  extends OrganizationRequest
  implements Executable<GetAutoNumberSeedResponse>
{
  declare readonly Parameters: Readonly<GetAutoNumberSeedRequestParameters>;

  constructor(parameters: GetAutoNumberSeedRequestParameters) {
    super("GetAutoNumberSeed", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetAutoNumberSeed`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      AttributeName: this.Parameters.AttributeName,
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

  async parseResponse(response: Response): Promise<GetAutoNumberSeedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GetAutoNumberSeedResponse.fromResponse({});
    return GetAutoNumberSeedResponse.fromResponse(await response.json());
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
