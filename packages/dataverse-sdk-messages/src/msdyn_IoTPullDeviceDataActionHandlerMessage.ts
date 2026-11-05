import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTPullDeviceDataActionHandler request message
 *
 * Web API Action: msdyn_IoTPullDeviceDataActionHandler
 */
export class msdyn_IoTPullDeviceDataActionHandlerRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTPullDeviceDataActionHandlerResponse>
{
  constructor(public entityCollection: Record<string, unknown>[]) {
    super("msdyn_IoTPullDeviceDataActionHandler");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTPullDeviceDataActionHandler`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTPullDeviceDataActionHandlerResponse> {
    const data = await response.json();
    return msdyn_IoTPullDeviceDataActionHandlerResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityCollection: this.entityCollection,
    };
  }
}

/**
 * msdyn_IoTPullDeviceDataActionHandler response message
 */
export class msdyn_IoTPullDeviceDataActionHandlerResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTPullDeviceDataActionHandlerResponse) {
    super("msdyn_IoTPullDeviceDataActionHandler");
  }

  static fromResponse(data: unknown): msdyn_IoTPullDeviceDataActionHandlerResponse {
    return new msdyn_IoTPullDeviceDataActionHandlerResponse((data as any).value);
  }
}
