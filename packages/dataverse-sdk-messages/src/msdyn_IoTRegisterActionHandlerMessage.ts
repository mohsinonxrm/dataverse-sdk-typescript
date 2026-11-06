import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_IoTRegisterActionHandlerResponse as msdyn_IoTRegisterActionHandlerResponseData } from "./types/index.js";

/**
 * msdyn_IoTRegisterActionHandler request message
 *
 * Web API Action: msdyn_IoTRegisterActionHandler
 */
export class msdyn_IoTRegisterActionHandlerRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTRegisterActionHandlerResponse>
{
  constructor(public entityCollection?: Record<string, unknown>[]) {
    super("msdyn_IoTRegisterActionHandler");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTRegisterActionHandler`;

    const body: Record<string, unknown> = {
      EntityCollection: this.entityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTRegisterActionHandlerResponse> {
    const data = await response.json();
    return msdyn_IoTRegisterActionHandlerResponse.fromResponse(data);
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
