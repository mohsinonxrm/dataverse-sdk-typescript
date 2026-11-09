import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteSIRequestResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteSIRequest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteSIRequestResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_ExecuteSIRequest response message
 *
 * `result` is the value the msdyn_ExecuteSIRequest action returns (see {@link msdyn_ExecuteSIRequestResult}).
 */
export class msdyn_ExecuteSIRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSIRequestResult) {
    super("msdyn_ExecuteSIRequest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteSIRequestResponse {
    return new msdyn_ExecuteSIRequestResponse(data as msdyn_ExecuteSIRequestResult);
  }
}
