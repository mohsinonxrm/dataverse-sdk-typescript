import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateApmEventHandlerResponse as msdyn_CreateApmEventHandlerResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateApmEventHandlerResponse.fromResponse({});
    return msdyn_CreateApmEventHandlerResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateApmEventHandler response message
 */
export class msdyn_CreateApmEventHandlerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateApmEventHandlerResponseData) {
    super("msdyn_CreateApmEventHandler");
  }

  static fromResponse(data: unknown): msdyn_CreateApmEventHandlerResponse {
    return new msdyn_CreateApmEventHandlerResponse(
      responseObject<msdyn_CreateApmEventHandlerResponseData>(data)
    );
  }
}
