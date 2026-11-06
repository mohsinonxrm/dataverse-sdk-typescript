import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BusinessNotification, ValidationResult } from "./types/index.js";

/**
 * Parameters of the ImmediateBook message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImmediateBookRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  AttachmentIds?: string[];
  EWSUrl?: string;
  AttachmentToken?: string;
}

/**
 * ImmediateBook request message
 *
 * Web API Action: ImmediateBook
 */
export class ImmediateBookRequest
  extends OrganizationRequest
  implements Executable<ImmediateBookResponse>
{
  declare readonly Parameters: Readonly<ImmediateBookRequestParameters>;

  constructor(parameters: ImmediateBookRequestParameters) {
    super("ImmediateBook", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImmediateBook`;

    const body = requestBody({
      Target: this.Parameters.Target,
      AttachmentIds: this.Parameters.AttachmentIds,
      EWSUrl: this.Parameters.EWSUrl,
      AttachmentToken: this.Parameters.AttachmentToken,
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

  async parseResponse(response: Response): Promise<ImmediateBookResponse> {
    // The body is the complex value, with its @odata.context
    return ImmediateBookResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ImmediateBook action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ImmediateBookResult {
  "@odata.context"?: string;
  Notifications: BusinessNotification[];
  ValidationResult: ValidationResult;
}

/**
 * ImmediateBook response message
 *
 * `result` is the value the ImmediateBook action returns (see {@link ImmediateBookResult}).
 */
export class ImmediateBookResponse extends OrganizationResponse {
  constructor(public result: ImmediateBookResult) {
    super("ImmediateBook");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ImmediateBookResponse {
    return new ImmediateBookResponse(data as ImmediateBookResult);
  }
}
