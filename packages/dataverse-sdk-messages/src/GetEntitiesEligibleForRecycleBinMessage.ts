import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GetEntitiesEligibleForRecycleBinResponse as GetEntitiesEligibleForRecycleBinResponseData } from "./types/index.js";

/**
 * GetEntitiesEligibleForRecycleBin request message
 *
 * Web API Action: GetEntitiesEligibleForRecycleBin
 */
export class GetEntitiesEligibleForRecycleBinRequest
  extends OrganizationRequest
  implements Executable<GetEntitiesEligibleForRecycleBinResponse>
{
  constructor() {
    super("GetEntitiesEligibleForRecycleBin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetEntitiesEligibleForRecycleBin`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetEntitiesEligibleForRecycleBinResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GetEntitiesEligibleForRecycleBinResponse.fromResponse({});
    return GetEntitiesEligibleForRecycleBinResponse.fromResponse(await response.json());
  }
}

/**
 * GetEntitiesEligibleForRecycleBin response message
 */
export class GetEntitiesEligibleForRecycleBinResponse extends OrganizationResponse {
  constructor(public result: GetEntitiesEligibleForRecycleBinResponseData) {
    super("GetEntitiesEligibleForRecycleBin");
  }

  static fromResponse(data: unknown): GetEntitiesEligibleForRecycleBinResponse {
    return new GetEntitiesEligibleForRecycleBinResponse(
      responseObject<GetEntitiesEligibleForRecycleBinResponseData>(data)
    );
  }
}
