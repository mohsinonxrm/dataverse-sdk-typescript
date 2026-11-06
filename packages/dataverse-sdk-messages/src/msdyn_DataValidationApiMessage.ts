import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_DataValidationApiResponse as msdyn_DataValidationApiResponseData } from "./types/index.js";

/**
 * msdyn_DataValidationApi request message
 *
 * Web API Action: msdyn_DataValidationApi
 */
export class msdyn_DataValidationApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_DataValidationApiResponse>
{
  constructor(
    public apiType: number,
    public apiPayLoad?: string
  ) {
    super("msdyn_DataValidationApi");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DataValidationApi`;

    const body: Record<string, unknown> = {
      ApiType: this.apiType,
      ApiPayLoad: this.apiPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_DataValidationApiResponse> {
    const data = await response.json();
    return msdyn_DataValidationApiResponse.fromResponse(data);
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
