import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SetAutoNumberSeed message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetAutoNumberSeedRequestParameters {
  EntityName: string;
  AttributeName: string;
  Value: number;
}

/**
 * SetAutoNumberSeed request message
 *
 * Web API Action: SetAutoNumberSeed
 */
export class SetAutoNumberSeedRequest
  extends OrganizationRequest
  implements Executable<SetAutoNumberSeedResponse>
{
  declare readonly Parameters: Readonly<SetAutoNumberSeedRequestParameters>;

  constructor(parameters: SetAutoNumberSeedRequestParameters) {
    super("SetAutoNumberSeed", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetAutoNumberSeed`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      AttributeName: this.Parameters.AttributeName,
      Value: this.Parameters.Value,
    });

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
