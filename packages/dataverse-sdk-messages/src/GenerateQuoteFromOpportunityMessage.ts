import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { ColumnSet } from "./types/index.js";

/**
 * Parameters of the GenerateQuoteFromOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateQuoteFromOpportunityRequestParameters {
  OpportunityId: string;
  ColumnSet?: ColumnSet;
  ProcessInstanceId?: EntityReference | AnyEntityPayload;
}

/**
 * GenerateQuoteFromOpportunity request message
 *
 * Web API Action: GenerateQuoteFromOpportunity
 */
export class GenerateQuoteFromOpportunityRequest
  extends OrganizationRequest
  implements Executable<GenerateQuoteFromOpportunityResponse>
{
  declare readonly Parameters: Readonly<GenerateQuoteFromOpportunityRequestParameters>;

  constructor(parameters: GenerateQuoteFromOpportunityRequestParameters) {
    super("GenerateQuoteFromOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateQuoteFromOpportunity`;

    const body = requestBody({
      OpportunityId: this.Parameters.OpportunityId,
      ColumnSet: enumBody(this.Parameters.ColumnSet, "ColumnSet"),
      ProcessInstanceId: this.Parameters.ProcessInstanceId,
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

  async parseResponse(response: Response): Promise<GenerateQuoteFromOpportunityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GenerateQuoteFromOpportunityResponse.fromResponse({});
    return GenerateQuoteFromOpportunityResponse.fromResponse(await response.json());
  }
}

/**
 * GenerateQuoteFromOpportunity response message
 */
export class GenerateQuoteFromOpportunityResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("GenerateQuoteFromOpportunity");
  }

  static fromResponse(data: unknown): GenerateQuoteFromOpportunityResponse {
    return new GenerateQuoteFromOpportunityResponse(responseObject<Record<string, unknown>>(data));
  }
}
