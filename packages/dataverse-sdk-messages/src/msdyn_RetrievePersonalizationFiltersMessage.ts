import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrievePersonalizationFiltersResponse as msdyn_RetrievePersonalizationFiltersResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrievePersonalizationFilters message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrievePersonalizationFiltersRequestParameters {
  AttributesToFilter: string;
}

/**
 * msdyn_RetrievePersonalizationFilters request message
 *
 * Web API Action: msdyn_RetrievePersonalizationFilters
 */
export class msdyn_RetrievePersonalizationFiltersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrievePersonalizationFiltersResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrievePersonalizationFiltersRequestParameters>;

  constructor(parameters: msdyn_RetrievePersonalizationFiltersRequestParameters) {
    super("msdyn_RetrievePersonalizationFilters", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrievePersonalizationFilters`;

    const body = requestBody({
      AttributesToFilter: this.Parameters.AttributesToFilter,
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

  async parseResponse(response: Response): Promise<msdyn_RetrievePersonalizationFiltersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrievePersonalizationFiltersResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_RetrievePersonalizationFilters response message
 */
export class msdyn_RetrievePersonalizationFiltersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrievePersonalizationFiltersResponseData) {
    super("msdyn_RetrievePersonalizationFilters");
  }

  static fromResponse(data: unknown): msdyn_RetrievePersonalizationFiltersResponse {
    return new msdyn_RetrievePersonalizationFiltersResponse(
      responseObject<msdyn_RetrievePersonalizationFiltersResponseData>(data)
    );
  }
}
