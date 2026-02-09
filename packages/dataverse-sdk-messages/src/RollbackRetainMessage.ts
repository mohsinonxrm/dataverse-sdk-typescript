import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RollbackRetainResponse> {
    const data = await response.json();
    return RollbackRetainResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      OperationId: this.operationId,
    };
  }
}

/**
 * RollbackRetain response message
 */
export class RollbackRetainResponse extends OrganizationResponse {
  constructor(public result: RollbackRetainResponse) {
    super("RollbackRetain");
  }

  static fromResponse(data: unknown): RollbackRetainResponse {
    return new RollbackRetainResponse((data as any).value);
  }
}
