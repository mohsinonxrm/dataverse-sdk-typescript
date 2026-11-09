import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
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
    // The body is the complex value, with its @odata.context
    return CreateCustomerRelationshipsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateCustomerRelationships action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateCustomerRelationshipsResult {
  "@odata.context"?: string;
  AttributeId: string;
  RelationshipIds: string[];
}

/**
 * CreateCustomerRelationships response message
 *
 * `result` is the value the CreateCustomerRelationships action returns (see {@link CreateCustomerRelationshipsResult}).
 */
export class CreateCustomerRelationshipsResponse extends OrganizationResponse {
  constructor(public result: CreateCustomerRelationshipsResult) {
    super("CreateCustomerRelationships");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateCustomerRelationshipsResponse {
    return new CreateCustomerRelationshipsResponse(data as CreateCustomerRelationshipsResult);
  }
}
