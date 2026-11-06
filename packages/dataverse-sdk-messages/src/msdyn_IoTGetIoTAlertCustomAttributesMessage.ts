import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_IoTGetIoTAlertCustomAttributesResponse as msdyn_IoTGetIoTAlertCustomAttributesResponseData } from "./types/index.js";

/**
 * msdyn_IoTGetIoTAlertCustomAttributes request message
 *
 * Web API Action: msdyn_IoTGetIoTAlertCustomAttributes
 */
export class msdyn_IoTGetIoTAlertCustomAttributesRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetIoTAlertCustomAttributesResponse>
{
  constructor() {
    super("msdyn_IoTGetIoTAlertCustomAttributes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetIoTAlertCustomAttributes`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IoTGetIoTAlertCustomAttributesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_IoTGetIoTAlertCustomAttributesResponse.fromResponse({});
    return msdyn_IoTGetIoTAlertCustomAttributesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IoTGetIoTAlertCustomAttributes response message
 */
export class msdyn_IoTGetIoTAlertCustomAttributesResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetIoTAlertCustomAttributesResponseData) {
    super("msdyn_IoTGetIoTAlertCustomAttributes");
  }

  static fromResponse(data: unknown): msdyn_IoTGetIoTAlertCustomAttributesResponse {
    return new msdyn_IoTGetIoTAlertCustomAttributesResponse(
      responseObject<msdyn_IoTGetIoTAlertCustomAttributesResponseData>(data)
    );
  }
}
