import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SetupAiConnection message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetupAiConnectionRequestParameters {
  connectorName: string;
  connectionName: string;
}

/**
 * SetupAiConnection request message
 *
 * Web API Action: SetupAiConnection
 */
export class SetupAiConnectionRequest
  extends OrganizationRequest
  implements Executable<SetupAiConnectionResponse>
{
  declare readonly Parameters: Readonly<SetupAiConnectionRequestParameters>;

  constructor(parameters: SetupAiConnectionRequestParameters) {
    super("SetupAiConnection", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetupAiConnection`;

    const body = requestBody({
      connectorName: this.Parameters.connectorName,
      connectionName: this.Parameters.connectionName,
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

  async parseResponse(response: Response): Promise<SetupAiConnectionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return SetupAiConnectionResponse.fromResponse({});
    return SetupAiConnectionResponse.fromResponse(await response.json());
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
