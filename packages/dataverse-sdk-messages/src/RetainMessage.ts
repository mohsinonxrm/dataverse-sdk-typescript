import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { RetainResponse as RetainResponseData } from "./types/index.js";

/**
 * Retain request message
 *
 * Web API Action: Retain
 */
export class RetainRequest extends OrganizationRequest implements Executable<RetainResponse> {
  constructor(
    public target: EntityReference,
    public operationId: string
  ) {
    super("Retain");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Retain`;

    const body: Record<string, unknown> = {
      Target: this.target,
      OperationId: this.operationId,
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

  async parseResponse(response: Response): Promise<RetainResponse> {
    const data = await response.json();
    return RetainResponse.fromResponse(data);
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
