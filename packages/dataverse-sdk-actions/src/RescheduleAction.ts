import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BusinessNotification, ValidationResult } from "./types/index.js";

/**
 * Response from the Reschedule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RescheduleResponse {
  "@odata.context"?: string;
  Notifications: BusinessNotification[];
  ValidationResult: ValidationResult;
}

/**
 * Parameters of the Reschedule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RescheduleActionParameters {
  Target: EntityReference | AnyEntityPayload;
  ReturnNotifications?: boolean;
}

/**
 * Reschedule action
 *
 * Unbound action
 */
export class RescheduleAction implements Executable<RescheduleResponse> {
  constructor(public readonly parameters: RescheduleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Reschedule`;

    const body = requestBody({
      Target: this.parameters.Target,
      ReturnNotifications: this.parameters.ReturnNotifications,
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
    return (await response.json()) as RescheduleResponse;
  }
}
