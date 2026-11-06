import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
  CreateCustomerRelationshipsResponse as CreateCustomerRelationshipsResponseData,
} from "./types/index.js";

/**
 * CreateCustomerRelationships request message
 *
 * Web API Action: CreateCustomerRelationships
 */
export class CreateCustomerRelationshipsRequest
  extends OrganizationRequest
  implements Executable<CreateCustomerRelationshipsResponse>
{
  constructor(
    public lookup: ComplexLookupAttributeMetadata,
    public oneToManyRelationships: ComplexOneToManyRelationshipMetadata[],
    public solutionUniqueName: string
  ) {
    super("CreateCustomerRelationships");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateCustomerRelationships`;

    const body: Record<string, unknown> = {
      Lookup: this.lookup,
      OneToManyRelationships: this.oneToManyRelationships,
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<CreateCustomerRelationshipsResponse> {
    const data = await response.json();
    return CreateCustomerRelationshipsResponse.fromResponse(data);
  }
}

/**
 * CreateCustomerRelationships response message
 */
export class CreateCustomerRelationshipsResponse extends OrganizationResponse {
  constructor(public result: CreateCustomerRelationshipsResponseData) {
    super("CreateCustomerRelationships");
  }

  static fromResponse(data: unknown): CreateCustomerRelationshipsResponse {
    return new CreateCustomerRelationshipsResponse(
      responseObject<CreateCustomerRelationshipsResponseData>(data)
    );
  }
}
