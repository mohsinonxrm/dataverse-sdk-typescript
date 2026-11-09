import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_OSConvertToLocalizedFeatures message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSConvertToLocalizedFeaturesRequestParameters {
  PredictionFeatures?: string;
}

/**
 * msdyn_OSConvertToLocalizedFeatures request message
 *
 * Web API Action: msdyn_OSConvertToLocalizedFeatures
 */
export class msdyn_OSConvertToLocalizedFeaturesRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSConvertToLocalizedFeaturesResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSConvertToLocalizedFeaturesRequestParameters>;

  constructor(parameters: msdyn_OSConvertToLocalizedFeaturesRequestParameters = {}) {
    super("msdyn_OSConvertToLocalizedFeatures", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSConvertToLocalizedFeatures`;

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

  async parseResponse(response: Response): Promise<msdyn_OSConvertToLocalizedFeaturesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OSConvertToLocalizedFeaturesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OSConvertToLocalizedFeatures action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSConvertToLocalizedFeaturesResult {
  "@odata.context"?: string;
  FeatureList: string;
}

/**
 * msdyn_OSConvertToLocalizedFeatures response message
 *
 * `result` is the value the msdyn_OSConvertToLocalizedFeatures action returns (see {@link msdyn_OSConvertToLocalizedFeaturesResult}).
 */
export class msdyn_OSConvertToLocalizedFeaturesResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSConvertToLocalizedFeaturesResult) {
    super("msdyn_OSConvertToLocalizedFeatures");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OSConvertToLocalizedFeaturesResponse {
    return new msdyn_OSConvertToLocalizedFeaturesResponse(
      data as msdyn_OSConvertToLocalizedFeaturesResult
    );
  }
}
