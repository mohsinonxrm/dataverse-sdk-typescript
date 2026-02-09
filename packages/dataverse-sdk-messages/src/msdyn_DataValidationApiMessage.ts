import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public apiPayLoad: string
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DataValidationApiResponse> {
    const data = await response.json();
    return msdyn_DataValidationApiResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ApiType: this.apiType,
      ApiPayLoad: this.apiPayLoad,
    };
  }
}

/**
 * msdyn_DataValidationApi response message
 */
export class msdyn_DataValidationApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_DataValidationApiResponse) {
    super("msdyn_DataValidationApi");
  }

  static fromResponse(data: unknown): msdyn_DataValidationApiResponse {
    return new msdyn_DataValidationApiResponse((data as any).value);
  }
}
