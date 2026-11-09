import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetWorkListConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetWorkListConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetWorkListConfigurationResult {
  "@odata.context"?: string;
  IsEnabledForUser: boolean;
  SettingsInstance: string;
  ViewsList: string;
}

/**
 * msdyn_GetWorkListConfiguration response message
 *
 * `result` is the value the msdyn_GetWorkListConfiguration action returns (see {@link msdyn_GetWorkListConfigurationResult}).
 */
export class msdyn_GetWorkListConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetWorkListConfigurationResult) {
    super("msdyn_GetWorkListConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetWorkListConfigurationResponse {
    return new msdyn_GetWorkListConfigurationResponse(data as msdyn_GetWorkListConfigurationResult);
  }
}
