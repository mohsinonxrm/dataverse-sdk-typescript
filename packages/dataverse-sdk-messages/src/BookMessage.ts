import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BusinessNotification, ValidationResult } from "./types/index.js";

/**
 * Parameters of the Book message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BookRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  ReturnNotifications?: boolean;
}

/**
 * Book request message
 *
 * Web API Action: Book
 */
export class BookRequest extends OrganizationRequest implements Executable<BookResponse> {
  declare readonly Parameters: Readonly<BookRequestParameters>;

  constructor(parameters: BookRequestParameters) {
    super("Book", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Book`;

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

  async parseResponse(response: Response): Promise<BookResponse> {
    // The body is the complex value, with its @odata.context
    return BookResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Book action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BookResult {
  "@odata.context"?: string;
  Notifications: BusinessNotification[];
  ValidationResult: ValidationResult;
}

/**
 * Book response message
 *
 * `result` is the value the Book action returns (see {@link BookResult}).
 */
export class BookResponse extends OrganizationResponse {
  constructor(public result: BookResult) {
    super("Book");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): BookResponse {
    return new BookResponse(data as BookResult);
  }
}
