import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BusinessNotification, ValidationResult } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return RescheduleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Reschedule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RescheduleResult {
  "@odata.context"?: string;
  Notifications: BusinessNotification[];
  ValidationResult: ValidationResult;
}

/**
 * Reschedule response message
 *
 * `result` is the value the Reschedule action returns (see {@link RescheduleResult}).
 */
export class RescheduleResponse extends OrganizationResponse {
  constructor(public result: RescheduleResult) {
    super("Reschedule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RescheduleResponse {
    return new RescheduleResponse(data as RescheduleResult);
  }
}
