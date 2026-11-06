import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpsertMultiple request message
 *
 * Web API Action: UpsertMultiple
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class UpsertMultipleRequest
  extends OrganizationRequest
  implements Executable<UpsertMultipleResponse>
{
  constructor(
    public entitySetName: string,
    public targets: Record<string, unknown>[]
  ) {
    super("UpsertMultiple");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`;

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

  async parseResponse(response: Response): Promise<UpsertMultipleResponse> {
    const data = await response.json();
    return UpsertMultipleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Targets: this.targets,
    };
  }
}

/**
 * UpsertMultiple response message
 */
export class UpsertMultipleResponse extends OrganizationResponse {
  constructor(public result: UpsertMultipleResponse) {
    super("UpsertMultiple");
  }

  static fromResponse(data: unknown): UpsertMultipleResponse {
    return new UpsertMultipleResponse((data as any).value);
  }
}
