import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_D365ChannelsNotification message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_D365ChannelsNotificationRequestParameters {
  notificationPayLoad: string;
}

/**
 * msdyn_D365ChannelsNotification request message
 *
 * Web API Action: msdyn_D365ChannelsNotification
 */
export class msdyn_D365ChannelsNotificationRequest
  extends OrganizationRequest
  implements Executable<msdyn_D365ChannelsNotificationResponse>
{
  declare readonly Parameters: Readonly<msdyn_D365ChannelsNotificationRequestParameters>;

  constructor(parameters: msdyn_D365ChannelsNotificationRequestParameters) {
    super("msdyn_D365ChannelsNotification", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_D365ChannelsNotification`;

    const body = requestBody({
      notificationPayLoad: this.Parameters.notificationPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_D365ChannelsNotificationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_D365ChannelsNotificationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_D365ChannelsNotification action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_D365ChannelsNotificationResult {
  "@odata.context"?: string;
  responseMessage: string;
}

/**
 * msdyn_D365ChannelsNotification response message
 *
 * `result` is the value the msdyn_D365ChannelsNotification action returns (see {@link msdyn_D365ChannelsNotificationResult}).
 */
export class msdyn_D365ChannelsNotificationResponse extends OrganizationResponse {
  constructor(public result: msdyn_D365ChannelsNotificationResult) {
    super("msdyn_D365ChannelsNotification");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_D365ChannelsNotificationResponse {
    return new msdyn_D365ChannelsNotificationResponse(data as msdyn_D365ChannelsNotificationResult);
  }
}
