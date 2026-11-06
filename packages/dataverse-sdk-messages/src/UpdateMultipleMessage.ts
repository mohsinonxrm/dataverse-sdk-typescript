import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpdateMultiple request message
 *
 * Web API Action: UpdateMultiple
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class UpdateMultipleRequest
  extends OrganizationRequest
  implements Executable<UpdateMultipleResponse>
{
  constructor(
    public entitySetName: string,
    public targets: Record<string, unknown>[]
  ) {
    super("UpdateMultiple");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.UpdateMultiple`;

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

  async parseResponse(response: Response): Promise<UpdateMultipleResponse> {
    // No return value (204 No Content)
    return new UpdateMultipleResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Targets: this.targets,
    };
  }
}

/**
 * UpdateMultiple response message
 */
export class UpdateMultipleResponse extends OrganizationResponse {
  constructor() {
    super("UpdateMultiple");
  }

  static fromResponse(_data: unknown): UpdateMultipleResponse {
    return new UpdateMultipleResponse();
  }
}
