import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
} from "./types/index.js";

/**
 * Response from the CreateCustomerRelationships action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateCustomerRelationshipsResponse {
  "@odata.context"?: string;
  AttributeId: string;
  RelationshipIds: string[];
}

/**
 * Parameters of the CreateCustomerRelationships action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateCustomerRelationshipsActionParameters {
  Lookup?: ComplexLookupAttributeMetadata;
  OneToManyRelationships?: ComplexOneToManyRelationshipMetadata[];
  SolutionUniqueName?: string;
}

/**
 * CreateCustomerRelationships action
 *
 * Unbound action
 */
export class CreateCustomerRelationshipsAction implements Executable<CreateCustomerRelationshipsResponse> {
  constructor(public readonly parameters: CreateCustomerRelationshipsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateCustomerRelationships`;

    const body = requestBody({
      Lookup: enumBody(this.parameters.Lookup, "ComplexLookupAttributeMetadata"),
      OneToManyRelationships: enumBody(
        this.parameters.OneToManyRelationships,
        "ComplexOneToManyRelationshipMetadata"
      ),
      SolutionUniqueName: this.parameters.SolutionUniqueName,
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
    return (await response.json()) as CreateCustomerRelationshipsResponse;
  }
}
