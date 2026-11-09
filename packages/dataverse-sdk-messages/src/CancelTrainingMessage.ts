import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CancelTraining message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CancelTrainingRequestParameters {
  version: string;
}

/**
 * CancelTraining request message
 *
 * Web API Action: CancelTraining
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class CancelTrainingRequest
  extends OrganizationRequest
  implements Executable<CancelTrainingResponse>
{
  declare readonly Parameters: Readonly<CancelTrainingRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: CancelTrainingRequestParameters
  ) {
    super("CancelTraining", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${odataLiteral.guid(this.msdyn_aiconfigurationId)})/Microsoft.Dynamics.CRM.CancelTraining`;

    const body = requestBody({
      version: this.Parameters.version,
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

  async parseResponse(response: Response): Promise<CancelTrainingResponse> {
    // The body is the complex value, with its @odata.context
    return CancelTrainingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CancelTraining action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CancelTrainingResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * CancelTraining response message
 *
 * `result` is the value the CancelTraining action returns (see {@link CancelTrainingResult}).
 */
export class CancelTrainingResponse extends OrganizationResponse {
  constructor(public result: CancelTrainingResult) {
    super("CancelTraining");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CancelTrainingResponse {
    return new CancelTrainingResponse(data as CancelTrainingResult);
  }
}
