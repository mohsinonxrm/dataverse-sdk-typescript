import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetFieldsForPredictionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetFieldsForPredictions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFieldsForPredictionsResult {
  "@odata.context"?: string;
  FieldsForPrediction: string;
  SettingsConfiguration: string;
}

/**
 * msdyn_GetFieldsForPredictions response message
 *
 * `result` is the value the msdyn_GetFieldsForPredictions action returns (see {@link msdyn_GetFieldsForPredictionsResult}).
 */
export class msdyn_GetFieldsForPredictionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFieldsForPredictionsResult) {
    super("msdyn_GetFieldsForPredictions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetFieldsForPredictionsResponse {
    return new msdyn_GetFieldsForPredictionsResponse(data as msdyn_GetFieldsForPredictionsResult);
  }
}
