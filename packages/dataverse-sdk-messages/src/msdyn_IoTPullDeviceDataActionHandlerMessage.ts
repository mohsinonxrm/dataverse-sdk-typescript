import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IoTPullDeviceDataActionHandlerResponse as msdyn_IoTPullDeviceDataActionHandlerResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_IoTPullDeviceDataActionHandler message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTPullDeviceDataActionHandlerRequestParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTPullDeviceDataActionHandler request message
 *
 * Web API Action: msdyn_IoTPullDeviceDataActionHandler
 */
export class msdyn_IoTPullDeviceDataActionHandlerRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTPullDeviceDataActionHandlerResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTPullDeviceDataActionHandlerRequestParameters>;

  constructor(parameters: msdyn_IoTPullDeviceDataActionHandlerRequestParameters = {}) {
    super("msdyn_IoTPullDeviceDataActionHandler", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTPullDeviceDataActionHandler`;

    const body = requestBody({
      EntityCollection: this.Parameters.EntityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTPullDeviceDataActionHandlerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_IoTPullDeviceDataActionHandlerResponse.fromResponse({});
    return msdyn_IoTPullDeviceDataActionHandlerResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IoTPullDeviceDataActionHandler response message
 */
export class msdyn_IoTPullDeviceDataActionHandlerResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTPullDeviceDataActionHandlerResponseData) {
    super("msdyn_IoTPullDeviceDataActionHandler");
  }

  static fromResponse(data: unknown): msdyn_IoTPullDeviceDataActionHandlerResponse {
    return new msdyn_IoTPullDeviceDataActionHandlerResponse(
      responseObject<msdyn_IoTPullDeviceDataActionHandlerResponseData>(data)
    );
  }
}
