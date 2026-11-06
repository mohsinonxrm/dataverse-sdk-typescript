import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return SetupAiConnectionResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return SetupAiConnectionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SetupAiConnection action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type SetupAiConnectionResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * SetupAiConnection response message
 *
 * `result` is the value the SetupAiConnection action returns (see {@link SetupAiConnectionResult}).
 */
export class SetupAiConnectionResponse extends OrganizationResponse {
  constructor(public result: SetupAiConnectionResult) {
    super("SetupAiConnection");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SetupAiConnectionResponse {
    return new SetupAiConnectionResponse((data ?? null) as SetupAiConnectionResult);
  }
}
