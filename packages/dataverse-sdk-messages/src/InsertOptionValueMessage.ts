import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { Label } from "./types/index.js";

/**
 * Parameters of the InsertOptionValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InsertOptionValueRequestParameters {
  Color?: string;
  OptionSetName?: string;
  AttributeLogicalName?: string;
  ExternalValue?: string;
  EntityLogicalName?: string;
  IsHidden?: boolean;
  Value?: number;
  Label?: Label;
  Description?: Label;
  ParentValues?: number[];
  SolutionUniqueName?: string;
}

/**
 * InsertOptionValue request message
 *
 * Web API Action: InsertOptionValue
 */
export class InsertOptionValueRequest
  extends OrganizationRequest
  implements Executable<InsertOptionValueResponse>
{
  declare readonly Parameters: Readonly<InsertOptionValueRequestParameters>;

  constructor(parameters: InsertOptionValueRequestParameters = {}) {
    super("InsertOptionValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InsertOptionValue`;

    const body = requestBody({
      Color: this.Parameters.Color,
      OptionSetName: this.Parameters.OptionSetName,
      AttributeLogicalName: this.Parameters.AttributeLogicalName,
      ExternalValue: this.Parameters.ExternalValue,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      IsHidden: this.Parameters.IsHidden,
      Value: this.Parameters.Value,
      Label: this.Parameters.Label,
      Description: this.Parameters.Description,
      ParentValues: this.Parameters.ParentValues,
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

  async parseResponse(response: Response): Promise<InsertOptionValueResponse> {
    // The body is the complex value, with its @odata.context
    return InsertOptionValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InsertOptionValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InsertOptionValueResult {
  "@odata.context"?: string;
  NewOptionValue: number;
}

/**
 * InsertOptionValue response message
 *
 * `result` is the value the InsertOptionValue action returns (see {@link InsertOptionValueResult}).
 */
export class InsertOptionValueResponse extends OrganizationResponse {
  constructor(public result: InsertOptionValueResult) {
    super("InsertOptionValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InsertOptionValueResponse {
    return new InsertOptionValueResponse(data as InsertOptionValueResult);
  }
}
