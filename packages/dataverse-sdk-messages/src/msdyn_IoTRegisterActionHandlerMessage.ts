import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTRegisterActionHandler request message
 *
 * Web API Action: msdyn_IoTRegisterActionHandler
 */
export class msdyn_IoTRegisterActionHandlerRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTRegisterActionHandlerResponse>
{
  constructor(public entityCollection: Record<string, unknown>[]) {
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

  toRequestBody(): Record<string, unknown> {
    return {
      EntityCollection: this.entityCollection,
    };
  }
}

/**
 * msdyn_IoTRegisterActionHandler response message
 */
export class msdyn_IoTRegisterActionHandlerResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTRegisterActionHandlerResponse) {
    super("msdyn_IoTRegisterActionHandler");
  }

  static fromResponse(data: unknown): msdyn_IoTRegisterActionHandlerResponse {
    return new msdyn_IoTRegisterActionHandlerResponse((data as any).value);
  }
}
