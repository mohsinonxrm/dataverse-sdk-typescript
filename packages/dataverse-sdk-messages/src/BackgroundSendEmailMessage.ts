import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Parameters of the BackgroundSendEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BackgroundSendEmailRequestParameters {
  Query?: TypedQueryBase;
}

/**
 * BackgroundSendEmail request message
 *
 * Web API Action: BackgroundSendEmail
 */
export class BackgroundSendEmailRequest
  extends OrganizationRequest
  implements Executable<BackgroundSendEmailResponse>
{
  declare readonly Parameters: Readonly<BackgroundSendEmailRequestParameters>;

  constructor(parameters: BackgroundSendEmailRequestParameters = {}) {
    super("BackgroundSendEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BackgroundSendEmail`;

    const body = requestBody({
      Query: enumBody(this.Parameters.Query, "QueryBase"),
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

  async parseResponse(response: Response): Promise<BackgroundSendEmailResponse> {
    // The body is the complex value, with its @odata.context
    return BackgroundSendEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the BackgroundSendEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BackgroundSendEmailResult {
  "@odata.context"?: string;
  HasAttachments: boolean[];
}

/**
 * BackgroundSendEmail response message
 *
 * `result` is the value the BackgroundSendEmail action returns (see {@link BackgroundSendEmailResult}).
 */
export class BackgroundSendEmailResponse extends OrganizationResponse {
  constructor(public result: BackgroundSendEmailResult) {
    super("BackgroundSendEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): BackgroundSendEmailResponse {
    return new BackgroundSendEmailResponse(data as BackgroundSendEmailResult);
  }
}
