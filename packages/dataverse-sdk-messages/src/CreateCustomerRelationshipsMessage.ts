import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
  CreateCustomerRelationshipsResponse as CreateCustomerRelationshipsResponseData,
} from "./types/index.js";

/**
 * Parameters of the CreateCustomerRelationships message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateCustomerRelationshipsRequestParameters {
  Lookup?: ComplexLookupAttributeMetadata;
  OneToManyRelationships?: ComplexOneToManyRelationshipMetadata[];
  SolutionUniqueName?: string;
}

/**
 * CreateCustomerRelationships request message
 *
 * Web API Action: CreateCustomerRelationships
 */
export class CreateCustomerRelationshipsRequest
  extends OrganizationRequest
  implements Executable<CreateCustomerRelationshipsResponse>
{
  declare readonly Parameters: Readonly<CreateCustomerRelationshipsRequestParameters>;

  constructor(parameters: CreateCustomerRelationshipsRequestParameters = {}) {
    super("CreateCustomerRelationships", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateCustomerRelationships`;

    const body = requestBody({
      Lookup: enumBody(this.Parameters.Lookup, "ComplexLookupAttributeMetadata"),
      OneToManyRelationships: enumBody(
        this.Parameters.OneToManyRelationships,
        "ComplexOneToManyRelationshipMetadata"
      ),
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

  async parseResponse(response: Response): Promise<CreateCustomerRelationshipsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CreateCustomerRelationshipsResponse.fromResponse(text ? JSON.parse(text) : {});
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
