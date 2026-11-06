import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CreateMultiple request message
 *
 * Web API Action: CreateMultiple
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class CreateMultipleRequest
  extends OrganizationRequest
  implements Executable<CreateMultipleResponse>
{
  constructor(
    public entitySetName: string,
    public targets: Record<string, unknown>[]
  ) {
    super("CreateMultiple");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple`;

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

  async parseResponse(response: Response): Promise<CreateMultipleResponse> {
    const data = await response.json();
    return CreateMultipleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Targets: this.targets,
    };
  }
}

/**
 * CreateMultiple response message
 */
export class CreateMultipleResponse extends OrganizationResponse {
  constructor(public result: CreateMultipleResponse) {
    super("CreateMultiple");
  }

  static fromResponse(data: unknown): CreateMultipleResponse {
    return new CreateMultipleResponse((data as any).value);
  }
}
