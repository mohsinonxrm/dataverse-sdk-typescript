import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAttributeInfluenceStatisticsResponse as msdyn_GetAttributeInfluenceStatisticsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAttributeInfluenceStatistics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAttributeInfluenceStatisticsRequestParameters {
  AttributeName: string;
  EntityName: string;
  PredictionName: string;
  PredictionType: string;
}

/**
 * msdyn_GetAttributeInfluenceStatistics request message
 *
 * Web API Action: msdyn_GetAttributeInfluenceStatistics
 */
export class msdyn_GetAttributeInfluenceStatisticsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAttributeInfluenceStatisticsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAttributeInfluenceStatisticsRequestParameters>;

  constructor(parameters: msdyn_GetAttributeInfluenceStatisticsRequestParameters) {
    super("msdyn_GetAttributeInfluenceStatistics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAttributeInfluenceStatistics`;

    const body = requestBody({
      AttributeName: this.Parameters.AttributeName,
      EntityName: this.Parameters.EntityName,
      PredictionName: this.Parameters.PredictionName,
      PredictionType: this.Parameters.PredictionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAttributeInfluenceStatisticsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetAttributeInfluenceStatisticsResponse.fromResponse(text ? JSON.parse(text) : {});
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
