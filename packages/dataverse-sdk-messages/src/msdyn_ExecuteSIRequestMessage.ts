import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExecuteSIRequestResponse as msdyn_ExecuteSIRequestResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExecuteSIRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteSIRequestRequestParameters {
  MethodName: string;
  MethodParams?: string;
  HttpRequestType: string;
  OrgMigratedToCoreServices?: boolean;
}

/**
 * msdyn_ExecuteSIRequest request message
 *
 * Web API Action: msdyn_ExecuteSIRequest
 */
export class msdyn_ExecuteSIRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteSIRequestResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteSIRequestRequestParameters>;

  constructor(parameters: msdyn_ExecuteSIRequestRequestParameters) {
    super("msdyn_ExecuteSIRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSIRequest`;

    const body = requestBody({
      MethodName: this.Parameters.MethodName,
      MethodParams: this.Parameters.MethodParams,
      HttpRequestType: this.Parameters.HttpRequestType,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSIRequestResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ExecuteSIRequestResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ExecuteSIRequest response message
 */
export class msdyn_ExecuteSIRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSIRequestResponseData) {
    super("msdyn_ExecuteSIRequest");
  }

  static fromResponse(data: unknown): msdyn_ExecuteSIRequestResponse {
    return new msdyn_ExecuteSIRequestResponse(
      responseObject<msdyn_ExecuteSIRequestResponseData>(data)
    );
  }
}
