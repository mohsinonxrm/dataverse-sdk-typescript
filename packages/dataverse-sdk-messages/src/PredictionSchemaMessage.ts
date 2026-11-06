import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the PredictionSchema message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PredictionSchemaRequestParameters {
  version: string;
  predictionMode?: string;
}

/**
 * PredictionSchema request message
 *
 * Web API Action: PredictionSchema
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class PredictionSchemaRequest
  extends OrganizationRequest
  implements Executable<PredictionSchemaResponse>
{
  declare readonly Parameters: Readonly<PredictionSchemaRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: PredictionSchemaRequestParameters
  ) {
    super("PredictionSchema", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.PredictionSchema`;

    const body = requestBody({
      version: this.Parameters.version,
      predictionMode: this.Parameters.predictionMode,
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

  async parseResponse(response: Response): Promise<PredictionSchemaResponse> {
    // The body is the complex value, with its @odata.context
    return PredictionSchemaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PredictionSchema action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PredictionSchemaResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * PredictionSchema response message
 *
 * `result` is the value the PredictionSchema action returns (see {@link PredictionSchemaResult}).
 */
export class PredictionSchemaResponse extends OrganizationResponse {
  constructor(public result: PredictionSchemaResult) {
    super("PredictionSchema");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PredictionSchemaResponse {
    return new PredictionSchemaResponse(data as PredictionSchemaResult);
  }
}
