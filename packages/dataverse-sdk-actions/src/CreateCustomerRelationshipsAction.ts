import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
} from "./types/index.js";

/**
 * Response from CreateCustomerRelationships action
 */
export interface CreateCustomerRelationshipsResponse {
  RelationshipIds: string[];
  AttributeId: string;
}

/**
 * CreateCustomerRelationships action
 *
 * Unbound action
 */
export class CreateCustomerRelationshipsAction implements Executable<CreateCustomerRelationshipsResponse> {
  constructor(
    public readonly lookup: ComplexLookupAttributeMetadata,
    public readonly oneToManyRelationships: ComplexOneToManyRelationshipMetadata[],
    public readonly solutionUniqueName: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateCustomerRelationshipsResponse> {
    const data = await response.json();
    return data as CreateCustomerRelationshipsResponse;
  }
}
