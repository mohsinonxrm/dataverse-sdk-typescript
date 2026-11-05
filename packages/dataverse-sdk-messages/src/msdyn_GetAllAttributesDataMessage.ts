import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAllAttributesDataResponse as msdyn_GetAllAttributesDataResponseData } from "./types/index.js";

/**
 * msdyn_GetAllAttributesData request message
 *
 * Web API Action: msdyn_GetAllAttributesData
 */
export class msdyn_GetAllAttributesDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAllAttributesDataResponse>
{
  constructor(
    public predictionName: string,
    public predictionType: string
  ) {
    super("msdyn_GetAllAttributesData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllAttributesData`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<msdyn_GetAllAttributesDataResponse> {
    const data = await response.json();
    return msdyn_GetAllAttributesDataResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetAllAttributesData response message
 */
export class msdyn_GetAllAttributesDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAllAttributesDataResponseData) {
    super("msdyn_GetAllAttributesData");
  }

  static fromResponse(data: unknown): msdyn_GetAllAttributesDataResponse {
    return new msdyn_GetAllAttributesDataResponse(
      responseObject<msdyn_GetAllAttributesDataResponseData>(data)
    );
  }
}
