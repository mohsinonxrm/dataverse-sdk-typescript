import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DataValidationApiResponse as msdyn_DataValidationApiResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_DataValidationApi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DataValidationApiRequestParameters {
  ApiType: number;
  ApiPayLoad?: string;
}

/**
 * msdyn_DataValidationApi request message
 *
 * Web API Action: msdyn_DataValidationApi
 */
export class msdyn_DataValidationApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_DataValidationApiResponse>
{
  declare readonly Parameters: Readonly<msdyn_DataValidationApiRequestParameters>;

  constructor(parameters: msdyn_DataValidationApiRequestParameters) {
    super("msdyn_DataValidationApi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DataValidationApi`;

    const body = requestBody({
      ApiType: this.Parameters.ApiType,
      ApiPayLoad: this.Parameters.ApiPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_DataValidationApiResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_DataValidationApiResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_DataValidationApi response message
 */
export class msdyn_DataValidationApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_DataValidationApiResponseData) {
    super("msdyn_DataValidationApi");
  }

  static fromResponse(data: unknown): msdyn_DataValidationApiResponse {
    return new msdyn_DataValidationApiResponse(
      responseObject<msdyn_DataValidationApiResponseData>(data)
    );
  }
}
