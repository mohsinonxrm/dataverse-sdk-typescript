import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SetAutoNumberSeed request message
 *
 * Web API Action: SetAutoNumberSeed
 */
export class SetAutoNumberSeedRequest
  extends OrganizationRequest
  implements Executable<SetAutoNumberSeedResponse>
{
  constructor(
    public entityName: string,
    public attributeName: string,
    public value: number
  ) {
    super("SetAutoNumberSeed");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetAutoNumberSeed`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      AttributeName: this.attributeName,
      Value: this.value,
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

  async parseResponse(response: Response): Promise<SetAutoNumberSeedResponse> {
    // No return value (204 No Content)
    return new SetAutoNumberSeedResponse();
  }
}

/**
 * SetAutoNumberSeed response message
 */
export class SetAutoNumberSeedResponse extends OrganizationResponse {
  constructor() {
    super("SetAutoNumberSeed");
  }

  static fromResponse(_data: unknown): SetAutoNumberSeedResponse {
    return new SetAutoNumberSeedResponse();
  }
}
