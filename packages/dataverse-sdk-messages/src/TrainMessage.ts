import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { TrainResponse as TrainResponseData } from "./types/index.js";

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
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.Train`;

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return TrainResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * Train response message
 */
export class TrainResponse extends OrganizationResponse {
  constructor(public result: TrainResponseData) {
    super("Train");
  }

  static fromResponse(data: unknown): TrainResponse {
    return new TrainResponse(responseObject<TrainResponseData>(data));
  }
}
