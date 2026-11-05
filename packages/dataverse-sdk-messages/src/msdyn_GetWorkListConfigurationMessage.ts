import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetWorkListConfigurationResponse as msdyn_GetWorkListConfigurationResponseData } from "./types/index.js";

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
}

/**
 * msdyn_GetWorkListConfiguration response message
 */
export class msdyn_GetWorkListConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetWorkListConfigurationResponseData) {
    super("msdyn_GetWorkListConfiguration");
  }

  static fromResponse(data: unknown): msdyn_GetWorkListConfigurationResponse {
    return new msdyn_GetWorkListConfigurationResponse(
      responseObject<msdyn_GetWorkListConfigurationResponseData>(data)
    );
  }
}
