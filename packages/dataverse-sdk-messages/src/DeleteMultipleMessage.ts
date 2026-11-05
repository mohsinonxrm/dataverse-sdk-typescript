import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeleteMultiple request message
 *
 * Web API Action: DeleteMultiple
 */
export class DeleteMultipleRequest
  extends OrganizationRequest
  implements Executable<DeleteMultipleResponse>
{
  constructor(public targets: Record<string, unknown>[]) {
    super("DeleteMultiple");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteMultiple`;

    const body: Record<string, unknown> = {
      Targets: this.targets,
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

  async parseResponse(response: Response): Promise<DeleteMultipleResponse> {
    // No return value (204 No Content)
    return new DeleteMultipleResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Targets: this.targets,
    };
  }
}

/**
 * DeleteMultiple response message
 */
export class DeleteMultipleResponse extends OrganizationResponse {
  constructor() {
    super("DeleteMultiple");
  }

  static fromResponse(_data: unknown): DeleteMultipleResponse {
    return new DeleteMultipleResponse();
  }
}
