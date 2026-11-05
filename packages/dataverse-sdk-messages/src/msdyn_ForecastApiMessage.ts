import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ForecastApi request message
 *
 * Web API Action: msdyn_ForecastApi
 */
export class msdyn_ForecastApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastApiResponse>
{
  constructor(
    public webApiName: string,
    public requestJson: string
  ) {
    super("msdyn_ForecastApi");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastApi`;

    const body: Record<string, unknown> = {
      WebApiName: this.webApiName,
      RequestJson: this.requestJson,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastApiResponse> {
    const data = await response.json();
    return msdyn_ForecastApiResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      WebApiName: this.webApiName,
      RequestJson: this.requestJson,
    };
  }
}

/**
 * msdyn_ForecastApi response message
 */
export class msdyn_ForecastApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_ForecastApiResponse) {
    super("msdyn_ForecastApi");
  }

  static fromResponse(data: unknown): msdyn_ForecastApiResponse {
    return new msdyn_ForecastApiResponse((data as any).value);
  }
}
