import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
} from "./types/index.js";

/**
 * Parameters of the CreatePolymorphicLookupAttribute message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreatePolymorphicLookupAttributeRequestParameters {
  Lookup?: ComplexLookupAttributeMetadata;
  OneToManyRelationships?: ComplexOneToManyRelationshipMetadata[];
  SolutionUniqueName?: string;
}

/**
 * CreatePolymorphicLookupAttribute request message
 *
 * Web API Action: CreatePolymorphicLookupAttribute
 */
export class CreatePolymorphicLookupAttributeRequest
  extends OrganizationRequest
  implements Executable<CreatePolymorphicLookupAttributeResponse>
{
  declare readonly Parameters: Readonly<CreatePolymorphicLookupAttributeRequestParameters>;

  constructor(parameters: CreatePolymorphicLookupAttributeRequestParameters = {}) {
    super("CreatePolymorphicLookupAttribute", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreatePolymorphicLookupAttribute`;

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

  async parseResponse(response: Response): Promise<CreatePolymorphicLookupAttributeResponse> {
    // The body is the complex value, with its @odata.context
    return CreatePolymorphicLookupAttributeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreatePolymorphicLookupAttribute action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreatePolymorphicLookupAttributeResult {
  "@odata.context"?: string;
  AttributeId: string;
  RelationshipIds: string[];
}

/**
 * CreatePolymorphicLookupAttribute response message
 *
 * `result` is the value the CreatePolymorphicLookupAttribute action returns (see {@link CreatePolymorphicLookupAttributeResult}).
 */
export class CreatePolymorphicLookupAttributeResponse extends OrganizationResponse {
  constructor(public result: CreatePolymorphicLookupAttributeResult) {
    super("CreatePolymorphicLookupAttribute");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreatePolymorphicLookupAttributeResponse {
    return new CreatePolymorphicLookupAttributeResponse(
      data as CreatePolymorphicLookupAttributeResult
    );
  }
}
