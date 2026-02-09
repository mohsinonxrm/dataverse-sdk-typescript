import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { BusinessNotification, ValidationResult } from "./types/index.js";

/**
 * Response from Reschedule action
 */
export interface RescheduleResponse {
  ValidationResult: ValidationResult;
  Notifications: BusinessNotification[];
}

/**
 * Reschedule action
 *
 * Unbound action
 */
export class RescheduleAction implements Executable<RescheduleResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly returnNotifications: boolean
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RescheduleResponse> {
    const data = await response.json();
    return data as RescheduleResponse;
  }
}
