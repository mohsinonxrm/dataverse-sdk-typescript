import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_IoTGetIoTAlertCustomAttributesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTGetIoTAlertCustomAttributes action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTGetIoTAlertCustomAttributesResult {
  "@odata.context"?: string;
  Metadata: string;
}

/**
 * msdyn_IoTGetIoTAlertCustomAttributes response message
 *
 * `result` is the value the msdyn_IoTGetIoTAlertCustomAttributes action returns (see {@link msdyn_IoTGetIoTAlertCustomAttributesResult}).
 */
export class msdyn_IoTGetIoTAlertCustomAttributesResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetIoTAlertCustomAttributesResult) {
    super("msdyn_IoTGetIoTAlertCustomAttributes");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTGetIoTAlertCustomAttributesResponse {
    return new msdyn_IoTGetIoTAlertCustomAttributesResponse(
      data as msdyn_IoTGetIoTAlertCustomAttributesResult
    );
  }
}
