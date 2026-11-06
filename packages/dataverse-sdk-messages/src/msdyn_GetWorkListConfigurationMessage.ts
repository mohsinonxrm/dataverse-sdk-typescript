import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetWorkListConfigurationResponse as msdyn_GetWorkListConfigurationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetWorkListConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetWorkListConfigurationRequestParameters {
  Viewtype?: string;
  GetData?: boolean;
  DefaultViewType?: string;
  QueryParams?: string;
}

/**
 * msdyn_GetWorkListConfiguration request message
 *
 * Web API Action: msdyn_GetWorkListConfiguration
 */
export class msdyn_GetWorkListConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetWorkListConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetWorkListConfigurationRequestParameters>;

  constructor(parameters: msdyn_GetWorkListConfigurationRequestParameters = {}) {
    super("msdyn_GetWorkListConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWorkListConfiguration`;

    const body = requestBody({
      Viewtype: this.Parameters.Viewtype,
      GetData: this.Parameters.GetData,
      DefaultViewType: this.Parameters.DefaultViewType,
      QueryParams: this.Parameters.QueryParams,
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

  async parseResponse(response: Response): Promise<msdyn_GetWorkListConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetWorkListConfigurationResponse.fromResponse(text ? JSON.parse(text) : {});
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
