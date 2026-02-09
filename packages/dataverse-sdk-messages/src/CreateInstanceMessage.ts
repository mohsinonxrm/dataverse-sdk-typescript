import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * CreateInstance request message
 *
 * Web API Action: CreateInstance
 */
export class CreateInstanceRequest
  extends OrganizationRequest
  implements Executable<CreateInstanceResponse>
{
  constructor(
    public target: EntityReference,
    public count: number
  ) {
    super("CreateInstance");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateInstance`;

    const body: Record<string, unknown> = {
      Target: this.target,
      Count: this.count,
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

  async parseResponse(response: Response): Promise<CreateInstanceResponse> {
    const data = await response.json();
    return CreateInstanceResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      Count: this.count,
    };
  }
}

/**
 * CreateInstance response message
 */
export class CreateInstanceResponse extends OrganizationResponse {
  constructor(public result: CreateInstanceResponse) {
    super("CreateInstance");
  }

  static fromResponse(data: unknown): CreateInstanceResponse {
    return new CreateInstanceResponse((data as any).value);
  }
}
