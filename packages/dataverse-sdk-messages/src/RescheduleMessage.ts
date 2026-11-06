import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { RescheduleResponse as RescheduleResponseData } from "./types/index.js";

/**
 * Parameters of the Reschedule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RescheduleRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  ReturnNotifications?: boolean;
}

/**
 * Reschedule request message
 *
 * Web API Action: Reschedule
 */
export class RescheduleRequest
  extends OrganizationRequest
  implements Executable<RescheduleResponse>
{
  declare readonly Parameters: Readonly<RescheduleRequestParameters>;

  constructor(parameters: RescheduleRequestParameters) {
    super("Reschedule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Reschedule`;

    const body = requestBody({
      Target: this.Parameters.Target,
      ReturnNotifications: this.Parameters.ReturnNotifications,
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

  async parseResponse(response: Response): Promise<RescheduleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return RescheduleResponse.fromResponse({});
    return RescheduleResponse.fromResponse(await response.json());
  }
}

/**
 * Reschedule response message
 */
export class RescheduleResponse extends OrganizationResponse {
  constructor(public result: RescheduleResponseData) {
    super("Reschedule");
  }

  static fromResponse(data: unknown): RescheduleResponse {
    return new RescheduleResponse(responseObject<RescheduleResponseData>(data));
  }
}
