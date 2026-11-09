import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExecuteHttpServiceRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteHttpServiceRequestRequestParameters {
  msdyn_RequestType: string;
  msdyn_Method: string;
  msdyn_CloudServiceApplicationType: number;
  msdyn_RequestBody?: string;
  msdyn_RequestUrl: string;
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
      msdyn_Method: this.Parameters.msdyn_Method,
      msdyn_CloudServiceApplicationType: this.Parameters.msdyn_CloudServiceApplicationType,
      msdyn_RequestBody: this.Parameters.msdyn_RequestBody,
      msdyn_RequestUrl: this.Parameters.msdyn_RequestUrl,
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
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteHttpServiceRequestResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteHttpServiceRequest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteHttpServiceRequestResult {
  "@odata.context"?: string;
  msdyn_Response: string;
  msdyn_StatusCode: string;
}

/**
 * msdyn_ExecuteHttpServiceRequest response message
 *
 * `result` is the value the msdyn_ExecuteHttpServiceRequest action returns (see {@link msdyn_ExecuteHttpServiceRequestResult}).
 */
export class msdyn_ExecuteHttpServiceRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteHttpServiceRequestResult) {
    super("msdyn_ExecuteHttpServiceRequest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteHttpServiceRequestResponse {
    return new msdyn_ExecuteHttpServiceRequestResponse(
      data as msdyn_ExecuteHttpServiceRequestResult
    );
  }
}
