import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BookResponse as BookResponseData } from "./types/index.js";

/**
 * Book request message
 *
 * Web API Action: Book
 */
export class BookRequest extends OrganizationRequest implements Executable<BookResponse> {
  constructor(
    public target: EntityReference | AnyEntityPayload,
    public returnNotifications?: boolean
  ) {
    super("Book");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<BookResponse> {
    const data = await response.json();
    return BookResponse.fromResponse(data);
  }
}

/**
 * Book response message
 */
export class BookResponse extends OrganizationResponse {
  constructor(public result: BookResponseData) {
    super("Book");
  }

  static fromResponse(data: unknown): BookResponse {
    return new BookResponse(responseObject<BookResponseData>(data));
  }
}
