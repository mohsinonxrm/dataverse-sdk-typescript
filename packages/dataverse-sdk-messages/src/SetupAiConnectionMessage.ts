import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";

/**
 * SetupAiConnection request message
 *
 * Web API Action: SetupAiConnection
 */
export class SetupAiConnectionRequest
  extends OrganizationRequest
  implements Executable<SetupAiConnectionResponse>
{
  constructor(
    public connectorName: string,
    public connectionName: string
  ) {
    super("SetupAiConnection");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetupAiConnection`;

    const body: Record<string, unknown> = {
      connectorName: this.connectorName,
      connectionName: this.connectionName,
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

  async parseResponse(response: Response): Promise<SetupAiConnectionResponse> {
    const data = await response.json();
    return SetupAiConnectionResponse.fromResponse(data);
  }
}

/**
 * SetupAiConnection response message
 */
export class SetupAiConnectionResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("SetupAiConnection");
  }

  static fromResponse(data: unknown): SetupAiConnectionResponse {
    return new SetupAiConnectionResponse(responseObject<Record<string, unknown>>(data));
  }
}
