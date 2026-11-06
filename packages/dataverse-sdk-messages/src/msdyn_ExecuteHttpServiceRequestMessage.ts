import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ExecuteHttpServiceRequestResponse as msdyn_ExecuteHttpServiceRequestResponseData } from "./types/index.js";

/**
 * msdyn_ExecuteHttpServiceRequest request message
 *
 * Web API Action: msdyn_ExecuteHttpServiceRequest
 */
export class msdyn_ExecuteHttpServiceRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteHttpServiceRequestResponse>
{
  constructor(
    public msdyn_RequestType: string,
    public msdyn_RequestUrl: string,
    public msdyn_CloudServiceApplicationType: number,
    public msdyn_RequestBody: string | undefined,
    public msdyn_Method: string
  ) {
    super("msdyn_ExecuteHttpServiceRequest");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteHttpServiceRequest`;

    const body: Record<string, unknown> = {
      msdyn_RequestType: this.msdyn_RequestType,
      msdyn_RequestUrl: this.msdyn_RequestUrl,
      msdyn_CloudServiceApplicationType: this.msdyn_CloudServiceApplicationType,
      msdyn_RequestBody: this.msdyn_RequestBody,
      msdyn_Method: this.msdyn_Method,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteHttpServiceRequestResponse> {
    const data = await response.json();
    return msdyn_ExecuteHttpServiceRequestResponse.fromResponse(data);
  }
}

/**
 * msdyn_ExecuteHttpServiceRequest response message
 */
export class msdyn_ExecuteHttpServiceRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteHttpServiceRequestResponseData) {
    super("msdyn_ExecuteHttpServiceRequest");
  }

  static fromResponse(data: unknown): msdyn_ExecuteHttpServiceRequestResponse {
    return new msdyn_ExecuteHttpServiceRequestResponse(
      responseObject<msdyn_ExecuteHttpServiceRequestResponseData>(data)
    );
  }
}
