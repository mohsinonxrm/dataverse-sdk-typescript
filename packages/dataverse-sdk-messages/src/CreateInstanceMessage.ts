import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { CreateInstanceResponse as CreateInstanceResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateInstanceResponse> {
    const data = await response.json();
    return CreateInstanceResponse.fromResponse(data);
  }
}

/**
 * CreateInstance response message
 */
export class CreateInstanceResponse extends OrganizationResponse {
  constructor(public result: CreateInstanceResponseData) {
    super("CreateInstance");
  }

  static fromResponse(data: unknown): CreateInstanceResponse {
    return new CreateInstanceResponse(responseObject<CreateInstanceResponseData>(data));
  }
}
