import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { RescheduleResponse as RescheduleResponseData } from "./types/index.js";

/**
 * Reschedule request message
 *
 * Web API Action: Reschedule
 */
export class RescheduleRequest
  extends OrganizationRequest
  implements Executable<RescheduleResponse>
{
  constructor(
    public target: EntityReference,
    public returnNotifications: boolean
  ) {
    super("Reschedule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Reschedule`;

    const body: Record<string, unknown> = {
      Target: this.target,
      ReturnNotifications: this.returnNotifications,
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

  async parseResponse(response: Response): Promise<RescheduleResponse> {
    const data = await response.json();
    return RescheduleResponse.fromResponse(data);
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
