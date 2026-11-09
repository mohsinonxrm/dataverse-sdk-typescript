import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateApmEventHandler message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateApmEventHandlerRequestParameters {
  AppModuleId: string;
}

/**
 * msdyn_CreateApmEventHandler request message
 *
 * Web API Action: msdyn_CreateApmEventHandler
 */
export class msdyn_CreateApmEventHandlerRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateApmEventHandlerResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateApmEventHandlerRequestParameters>;

  constructor(parameters: msdyn_CreateApmEventHandlerRequestParameters) {
    super("msdyn_CreateApmEventHandler", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateApmEventHandler`;

    const body = requestBody({
      AppModuleId: this.Parameters.AppModuleId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateApmEventHandlerResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateApmEventHandlerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateApmEventHandler action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateApmEventHandlerResult {
  "@odata.context"?: string;
  UpdateAppModuleResponse: string;
}

/**
 * msdyn_CreateApmEventHandler response message
 *
 * `result` is the value the msdyn_CreateApmEventHandler action returns (see {@link msdyn_CreateApmEventHandlerResult}).
 */
export class msdyn_CreateApmEventHandlerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateApmEventHandlerResult) {
    super("msdyn_CreateApmEventHandler");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateApmEventHandlerResponse {
    return new msdyn_CreateApmEventHandlerResponse(data as msdyn_CreateApmEventHandlerResult);
  }
}
