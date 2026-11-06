import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type {
  InsertOptionValueResponse as InsertOptionValueResponseData,
  Label,
} from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return InsertOptionValueResponse.fromResponse({});
    return InsertOptionValueResponse.fromResponse(await response.json());
  }
}

/**
 * InsertOptionValue response message
 */
export class InsertOptionValueResponse extends OrganizationResponse {
  constructor(public result: InsertOptionValueResponseData) {
    super("InsertOptionValue");
  }

  static fromResponse(data: unknown): InsertOptionValueResponse {
    return new InsertOptionValueResponse(responseObject<InsertOptionValueResponseData>(data));
  }
}
