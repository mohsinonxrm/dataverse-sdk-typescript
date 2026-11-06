import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ConvertToLocalizedFeatures message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertToLocalizedFeaturesRequestParameters {
  PredictionFeatures?: string;
}

/**
 * msdyn_ConvertToLocalizedFeatures request message
 *
 * Web API Action: msdyn_ConvertToLocalizedFeatures
 */
export class msdyn_ConvertToLocalizedFeaturesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertToLocalizedFeaturesResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConvertToLocalizedFeaturesRequestParameters>;

  constructor(parameters: msdyn_ConvertToLocalizedFeaturesRequestParameters = {}) {
    super("msdyn_ConvertToLocalizedFeatures", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertToLocalizedFeatures`;

    const body = requestBody({
      PredictionFeatures: this.Parameters.PredictionFeatures,
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

  async parseResponse(response: Response): Promise<msdyn_ConvertToLocalizedFeaturesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ConvertToLocalizedFeaturesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ConvertToLocalizedFeatures action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConvertToLocalizedFeaturesResult {
  "@odata.context"?: string;
  FeatureList: string;
}

/**
 * msdyn_ConvertToLocalizedFeatures response message
 *
 * `result` is the value the msdyn_ConvertToLocalizedFeatures action returns (see {@link msdyn_ConvertToLocalizedFeaturesResult}).
 */
export class msdyn_ConvertToLocalizedFeaturesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertToLocalizedFeaturesResult) {
    super("msdyn_ConvertToLocalizedFeatures");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ConvertToLocalizedFeaturesResponse {
    return new msdyn_ConvertToLocalizedFeaturesResponse(
      data as msdyn_ConvertToLocalizedFeaturesResult
    );
  }
}
