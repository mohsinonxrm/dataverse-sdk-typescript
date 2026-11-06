import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { RetainResponse as RetainResponseData } from "./types/index.js";

/**
 * Parameters of the Retain message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetainRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  OperationId?: string;
}

/**
 * Retain request message
 *
 * Web API Action: Retain
 */
export class RetainRequest extends OrganizationRequest implements Executable<RetainResponse> {
  declare readonly Parameters: Readonly<RetainRequestParameters>;

  constructor(parameters: RetainRequestParameters) {
    super("Retain", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Retain`;

    const body = requestBody({
      Target: this.Parameters.Target,
      OperationId: this.Parameters.OperationId,
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

  async parseResponse(response: Response): Promise<RetainResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return RetainResponse.fromResponse({});
    return RetainResponse.fromResponse(await response.json());
  }
}

/**
 * Retain response message
 */
export class RetainResponse extends OrganizationResponse {
  constructor(public result: RetainResponseData) {
    super("Retain");
  }

  static fromResponse(data: unknown): RetainResponse {
    return new RetainResponse(responseObject<RetainResponseData>(data));
  }
}
