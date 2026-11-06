import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BookResponse as BookResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return BookResponse.fromResponse({});
    return BookResponse.fromResponse(await response.json());
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
