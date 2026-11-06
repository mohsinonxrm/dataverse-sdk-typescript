import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PredictResponse as PredictResponseData } from "./types/index.js";

/**
 * Predict request message
 *
 * Web API Action: Predict
 */
export class PredictRequest extends OrganizationRequest implements Executable<PredictResponse> {
  constructor(
    public msdyn_aimodelId: string,
    public version: string,
    public request?: string,
    public requestv2?: EntityReference | AnyEntityPayload,
    public source?: string
  ) {
    super("Predict");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.Predict`;

    const body: Record<string, unknown> = {
      version: this.version,
      request: this.request,
      requestv2: this.requestv2,
      source: this.source,
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

  async parseResponse(response: Response): Promise<PredictResponse> {
    const data = await response.json();
    return PredictResponse.fromResponse(data);
  }
}

/**
 * Predict response message
 */
export class PredictResponse extends OrganizationResponse {
  constructor(public result: PredictResponseData) {
    super("Predict");
  }

  static fromResponse(data: unknown): PredictResponse {
    return new PredictResponse(responseObject<PredictResponseData>(data));
  }
}
