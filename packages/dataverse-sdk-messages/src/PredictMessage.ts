import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the Predict message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PredictRequestParameters {
  version: string;
  request?: string;
  requestv2?: EntityReference | AnyEntityPayload;
  source?: string;
}

/**
 * Predict request message
 *
 * Web API Action: Predict
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class PredictRequest extends OrganizationRequest implements Executable<PredictResponse> {
  declare readonly Parameters: Readonly<PredictRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: PredictRequestParameters
  ) {
    super("Predict", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${odataLiteral.guid(this.msdyn_aimodelId)})/Microsoft.Dynamics.CRM.Predict`;

    const body = requestBody({
      version: this.Parameters.version,
      request: this.Parameters.request,
      requestv2: this.Parameters.requestv2,
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

  async parseResponse(response: Response): Promise<PredictResponse> {
    // The body is the complex value, with its @odata.context
    return PredictResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Predict action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PredictResult {
  "@odata.context"?: string;
  overrideHttpStatusCode: string;
  overrideLocation: string;
  overrideRetryAfter: string;
  response: string;
}

/**
 * Predict response message
 *
 * `result` is the value the Predict action returns (see {@link PredictResult}).
 */
export class PredictResponse extends OrganizationResponse {
  constructor(public result: PredictResult) {
    super("Predict");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PredictResponse {
    return new PredictResponse(data as PredictResult);
  }
}
