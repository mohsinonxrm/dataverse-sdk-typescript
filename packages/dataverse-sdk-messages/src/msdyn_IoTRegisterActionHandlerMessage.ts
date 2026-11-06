import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IoTRegisterActionHandlerResponse as msdyn_IoTRegisterActionHandlerResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_IoTRegisterActionHandler message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTRegisterActionHandlerRequestParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTRegisterActionHandler request message
 *
 * Web API Action: msdyn_IoTRegisterActionHandler
 */
export class msdyn_IoTRegisterActionHandlerRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTRegisterActionHandlerResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTRegisterActionHandlerRequestParameters>;

  constructor(parameters: msdyn_IoTRegisterActionHandlerRequestParameters = {}) {
    super("msdyn_IoTRegisterActionHandler", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTRegisterActionHandler`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTRegisterActionHandlerResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_IoTRegisterActionHandlerResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_IoTRegisterActionHandler response message
 */
export class msdyn_IoTRegisterActionHandlerResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTRegisterActionHandlerResponseData) {
    super("msdyn_IoTRegisterActionHandler");
  }

  static fromResponse(data: unknown): msdyn_IoTRegisterActionHandlerResponse {
    return new msdyn_IoTRegisterActionHandlerResponse(
      responseObject<msdyn_IoTRegisterActionHandlerResponseData>(data)
    );
  }
}
