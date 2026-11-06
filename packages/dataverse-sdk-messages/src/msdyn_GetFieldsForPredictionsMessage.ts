import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetFieldsForPredictionsResponse as msdyn_GetFieldsForPredictionsResponseData } from "./types/index.js";

/**
 * msdyn_GetFieldsForPredictions request message
 *
 * Web API Action: msdyn_GetFieldsForPredictions
 */
export class msdyn_GetFieldsForPredictionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFieldsForPredictionsResponse>
{
  constructor() {
    super("msdyn_GetFieldsForPredictions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFieldsForPredictions`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetFieldsForPredictionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetFieldsForPredictionsResponse.fromResponse({});
    return msdyn_GetFieldsForPredictionsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetFieldsForPredictions response message
 */
export class msdyn_GetFieldsForPredictionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFieldsForPredictionsResponseData) {
    super("msdyn_GetFieldsForPredictions");
  }

  static fromResponse(data: unknown): msdyn_GetFieldsForPredictionsResponse {
    return new msdyn_GetFieldsForPredictionsResponse(
      responseObject<msdyn_GetFieldsForPredictionsResponseData>(data)
    );
  }
}
