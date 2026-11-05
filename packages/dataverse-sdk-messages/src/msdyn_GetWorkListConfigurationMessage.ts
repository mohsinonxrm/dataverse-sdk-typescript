import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetWorkListConfiguration request message
 *
 * Web API Action: msdyn_GetWorkListConfiguration
 */
export class msdyn_GetWorkListConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetWorkListConfigurationResponse>
{
  constructor(
    public viewtype: string,
    public getData: boolean,
    public defaultViewType: string,
    public queryParams: string
  ) {
    super("msdyn_GetWorkListConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWorkListConfiguration`;

    const body: Record<string, unknown> = {
      Viewtype: this.viewtype,
      GetData: this.getData,
      DefaultViewType: this.defaultViewType,
      QueryParams: this.queryParams,
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

  async parseResponse(response: Response): Promise<msdyn_GetWorkListConfigurationResponse> {
    const data = await response.json();
    return msdyn_GetWorkListConfigurationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Viewtype: this.viewtype,
      GetData: this.getData,
      DefaultViewType: this.defaultViewType,
      QueryParams: this.queryParams,
    };
  }
}

/**
 * msdyn_GetWorkListConfiguration response message
 */
export class msdyn_GetWorkListConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetWorkListConfigurationResponse) {
    super("msdyn_GetWorkListConfiguration");
  }

  static fromResponse(data: unknown): msdyn_GetWorkListConfigurationResponse {
    return new msdyn_GetWorkListConfigurationResponse((data as any).value);
  }
}
