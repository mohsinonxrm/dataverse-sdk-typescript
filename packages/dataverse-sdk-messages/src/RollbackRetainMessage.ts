import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { RollbackRetainResponse as RollbackRetainResponseData } from "./types/index.js";

/**
 * RollbackRetain request message
 *
 * Web API Action: RollbackRetain
 */
export class RollbackRetainRequest
  extends OrganizationRequest
  implements Executable<RollbackRetainResponse>
{
  constructor(
    public target: EntityReference,
    public operationId: string
  ) {
    super("RollbackRetain");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RollbackRetain`;

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

  async parseResponse(response: Response): Promise<RollbackRetainResponse> {
    const data = await response.json();
    return RollbackRetainResponse.fromResponse(data);
  }
}

/**
 * RollbackRetain response message
 */
export class RollbackRetainResponse extends OrganizationResponse {
  constructor(public result: RollbackRetainResponseData) {
    super("RollbackRetain");
  }

  static fromResponse(data: unknown): RollbackRetainResponse {
    return new RollbackRetainResponse(responseObject<RollbackRetainResponseData>(data));
  }
}
