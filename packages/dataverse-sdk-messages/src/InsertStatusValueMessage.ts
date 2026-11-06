import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { Label } from "./types/index.js";

/**
 * Parameters of the InsertStatusValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InsertStatusValueRequestParameters {
  Color?: string;
  OptionSetName?: string;
  AttributeLogicalName?: string;
  EntityLogicalName?: string;
  Value?: number;
  Label?: Label;
  Description?: Label;
  StateCode: number;
  SolutionUniqueName?: string;
}

/**
 * InsertStatusValue request message
 *
 * Web API Action: InsertStatusValue
 */
export class InsertStatusValueRequest
  extends OrganizationRequest
  implements Executable<InsertStatusValueResponse>
{
  declare readonly Parameters: Readonly<InsertStatusValueRequestParameters>;

  constructor(parameters: InsertStatusValueRequestParameters) {
    super("InsertStatusValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InsertStatusValue`;

    const body = requestBody({
      Color: this.Parameters.Color,
      OptionSetName: this.Parameters.OptionSetName,
      AttributeLogicalName: this.Parameters.AttributeLogicalName,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Value: this.Parameters.Value,
      Label: this.Parameters.Label,
      Description: this.Parameters.Description,
      StateCode: this.Parameters.StateCode,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<InsertStatusValueResponse> {
    // The body is the complex value, with its @odata.context
    return InsertStatusValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InsertStatusValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InsertStatusValueResult {
  "@odata.context"?: string;
  NewOptionValue: number;
}

/**
 * InsertStatusValue response message
 *
 * `result` is the value the InsertStatusValue action returns (see {@link InsertStatusValueResult}).
 */
export class InsertStatusValueResponse extends OrganizationResponse {
  constructor(public result: InsertStatusValueResult) {
    super("InsertStatusValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InsertStatusValueResponse {
    return new InsertStatusValueResponse(data as InsertStatusValueResult);
  }
}
