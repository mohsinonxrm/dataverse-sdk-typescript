import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type {
  InsertStatusValueResponse as InsertStatusValueResponseData,
  Label,
} from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return InsertStatusValueResponse.fromResponse({});
    return InsertStatusValueResponse.fromResponse(await response.json());
  }
}

/**
 * InsertStatusValue response message
 */
export class InsertStatusValueResponse extends OrganizationResponse {
  constructor(public result: InsertStatusValueResponseData) {
    super("InsertStatusValue");
  }

  static fromResponse(data: unknown): InsertStatusValueResponse {
    return new InsertStatusValueResponse(responseObject<InsertStatusValueResponseData>(data));
  }
}
