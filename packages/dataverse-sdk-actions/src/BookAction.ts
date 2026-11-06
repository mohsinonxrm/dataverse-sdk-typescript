import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BusinessNotification, ValidationResult } from "./types/index.js";

/**
 * Response from Book action
 */
export interface BookResponse {
  Notifications: BusinessNotification[];
  ValidationResult: ValidationResult;
}

/**
 * Parameters of the Book action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BookActionParameters {
  Target: EntityReference | AnyEntityPayload;
  ReturnNotifications?: boolean;
}

/**
 * Book action
 *
 * Unbound action
 */
export class BookAction implements Executable<BookResponse> {
  constructor(public readonly parameters: BookActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Book`;

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

  async parseResponse(response: Response): Promise<BookResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as BookResponse;
  }
}
