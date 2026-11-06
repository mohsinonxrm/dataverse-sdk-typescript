import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ExecuteSIRequestResponse as msdyn_ExecuteSIRequestResponseData } from "./types/index.js";

/**
 * msdyn_ExecuteSIRequest request message
 *
 * Web API Action: msdyn_ExecuteSIRequest
 */
export class msdyn_ExecuteSIRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteSIRequestResponse>
{
  constructor(
    public methodName: string,
    public methodParams: string,
    public httpRequestType: string,
    public orgMigratedToCoreServices: boolean
  ) {
    super("msdyn_ExecuteSIRequest");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSIRequest`;

    const body: Record<string, unknown> = {
      MethodName: this.methodName,
      MethodParams: this.methodParams,
      HttpRequestType: this.httpRequestType,
      OrgMigratedToCoreServices: this.orgMigratedToCoreServices,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSIRequestResponse> {
    const data = await response.json();
    return msdyn_ExecuteSIRequestResponse.fromResponse(data);
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
