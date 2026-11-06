import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  BackgroundSendEmailResponse as BackgroundSendEmailResponseData,
  TypedQueryBase,
} from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return BackgroundSendEmailResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * BackgroundSendEmail response message
 */
export class BackgroundSendEmailResponse extends OrganizationResponse {
  constructor(public result: BackgroundSendEmailResponseData) {
    super("BackgroundSendEmail");
  }

  static fromResponse(data: unknown): BackgroundSendEmailResponse {
    return new BackgroundSendEmailResponse(responseObject<BackgroundSendEmailResponseData>(data));
  }
}
