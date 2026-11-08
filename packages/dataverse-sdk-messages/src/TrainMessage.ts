import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the Train message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface TrainRequestParameters {
  version: string;
  source?: string;
}

/**
 * Train request message
 *
 * Web API Action: Train
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class TrainRequest extends OrganizationRequest implements Executable<TrainResponse> {
  declare readonly Parameters: Readonly<TrainRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: TrainRequestParameters
  ) {
    super("Train", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${odataLiteral.guid(this.msdyn_aiconfigurationId)})/Microsoft.Dynamics.CRM.Train`;

    const body = requestBody({
      version: this.Parameters.version,
      source: this.Parameters.source,
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

  async parseResponse(response: Response): Promise<TrainResponse> {
    // The body is the complex value, with its @odata.context
    return TrainResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Train action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface TrainResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * Train response message
 *
 * `result` is the value the Train action returns (see {@link TrainResult}).
 */
export class TrainResponse extends OrganizationResponse {
  constructor(public result: TrainResult) {
    super("Train");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): TrainResponse {
    return new TrainResponse(data as TrainResult);
  }
}
