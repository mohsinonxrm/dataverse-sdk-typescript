import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * Book request message
 *
 * Web API Action: Book
 */
export class BookRequest extends OrganizationRequest implements Executable<BookResponse> {
  constructor(
    public target: EntityReference,
    public returnNotifications: boolean
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

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      ReturnNotifications: this.returnNotifications,
    };
  }
}

/**
 * Book response message
 */
export class BookResponse extends OrganizationResponse {
  constructor(public result: BookResponse) {
    super("Book");
  }

  static fromResponse(data: unknown): BookResponse {
    return new BookResponse((data as any).value);
  }
}
