import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExecuteHttpServiceRequestResponse as msdyn_ExecuteHttpServiceRequestResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExecuteHttpServiceRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteHttpServiceRequestRequestParameters {
  msdyn_RequestType: string;
  msdyn_RequestUrl: string;
  msdyn_CloudServiceApplicationType: number;
  msdyn_RequestBody?: string;
  msdyn_Method: string;
}

/**
 * msdyn_ExecuteHttpServiceRequest request message
 *
 * Web API Action: msdyn_ExecuteHttpServiceRequest
 */
export class msdyn_ExecuteHttpServiceRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteHttpServiceRequestResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteHttpServiceRequestRequestParameters>;

  constructor(parameters: msdyn_ExecuteHttpServiceRequestRequestParameters) {
    super("msdyn_ExecuteHttpServiceRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteHttpServiceRequest`;

    const body = requestBody({
      msdyn_RequestType: this.Parameters.msdyn_RequestType,
      msdyn_RequestUrl: this.Parameters.msdyn_RequestUrl,
      msdyn_CloudServiceApplicationType: this.Parameters.msdyn_CloudServiceApplicationType,
      msdyn_RequestBody: this.Parameters.msdyn_RequestBody,
      msdyn_Method: this.Parameters.msdyn_Method,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteHttpServiceRequestResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ExecuteHttpServiceRequestResponse.fromResponse({});
    return msdyn_ExecuteHttpServiceRequestResponse.fromResponse(await response.json());
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
