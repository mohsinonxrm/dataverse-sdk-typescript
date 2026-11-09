import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetServiceBaseUrl message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetServiceBaseUrlRequestParameters {
  AzureApplicationType: number;
  OrgMigratedToCoreServices?: boolean;
}

/**
 * msdyn_GetServiceBaseUrl request message
 *
 * Web API Action: msdyn_GetServiceBaseUrl
 */
export class msdyn_GetServiceBaseUrlRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetServiceBaseUrlResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetServiceBaseUrlRequestParameters>;

  constructor(parameters: msdyn_GetServiceBaseUrlRequestParameters) {
    super("msdyn_GetServiceBaseUrl", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetServiceBaseUrl`;

    const body = requestBody({
      AzureApplicationType: this.Parameters.AzureApplicationType,
      OrgMigratedToCoreServices: this.Parameters.OrgMigratedToCoreServices,
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

  async parseResponse(response: Response): Promise<msdyn_GetServiceBaseUrlResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetServiceBaseUrlResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetServiceBaseUrl action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetServiceBaseUrlResult {
  "@odata.context"?: string;
  BaseUrl: string;
}

/**
 * msdyn_GetServiceBaseUrl response message
 *
 * `result` is the value the msdyn_GetServiceBaseUrl action returns (see {@link msdyn_GetServiceBaseUrlResult}).
 */
export class msdyn_GetServiceBaseUrlResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetServiceBaseUrlResult) {
    super("msdyn_GetServiceBaseUrl");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetServiceBaseUrlResponse {
    return new msdyn_GetServiceBaseUrlResponse(data as msdyn_GetServiceBaseUrlResult);
  }
}
