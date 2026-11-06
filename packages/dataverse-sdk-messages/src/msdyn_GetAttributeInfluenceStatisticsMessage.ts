import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAttributeInfluenceStatisticsResponse as msdyn_GetAttributeInfluenceStatisticsResponseData } from "./types/index.js";

/**
 * msdyn_GetAttributeInfluenceStatistics request message
 *
 * Web API Action: msdyn_GetAttributeInfluenceStatistics
 */
export class msdyn_GetAttributeInfluenceStatisticsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAttributeInfluenceStatisticsResponse>
{
  constructor(
    public attributeName: string,
    public entityName: string,
    public predictionName: string,
    public predictionType: string
  ) {
    super("msdyn_GetAttributeInfluenceStatistics");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAttributeInfluenceStatistics`;

    const body: Record<string, unknown> = {
      AttributeName: this.attributeName,
      EntityName: this.entityName,
      PredictionName: this.predictionName,
      PredictionType: this.predictionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAttributeInfluenceStatisticsResponse> {
    const data = await response.json();
    return msdyn_GetAttributeInfluenceStatisticsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetAttributeInfluenceStatistics response message
 */
export class msdyn_GetAttributeInfluenceStatisticsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAttributeInfluenceStatisticsResponseData) {
    super("msdyn_GetAttributeInfluenceStatistics");
  }

  static fromResponse(data: unknown): msdyn_GetAttributeInfluenceStatisticsResponse {
    return new msdyn_GetAttributeInfluenceStatisticsResponse(
      responseObject<msdyn_GetAttributeInfluenceStatisticsResponseData>(data)
    );
  }
}
