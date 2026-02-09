import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { BusinessNotification, ValidationResult } from "./types/index.js";

/**
 * Response from Book action
 */
export interface BookResponse {
  Notifications: BusinessNotification[];
  ValidationResult: ValidationResult;
}

/**
 * Book action
 *
 * Unbound action
 */
export class BookAction implements Executable<BookResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly returnNotifications: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Book`;

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

  async parseResponse(response: Response): Promise<BookResponse> {
    const data = await response.json();
    return data as BookResponse;
  }
}
