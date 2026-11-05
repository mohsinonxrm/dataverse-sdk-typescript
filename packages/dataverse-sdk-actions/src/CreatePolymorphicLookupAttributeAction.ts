import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
} from "./types/index.js";

/**
 * Response from CreatePolymorphicLookupAttribute action
 */
export interface CreatePolymorphicLookupAttributeResponse {
  RelationshipIds: string[];
  AttributeId: string;
}

/**
 * CreatePolymorphicLookupAttribute action
 *
 * Unbound action
 */
export class CreatePolymorphicLookupAttributeAction implements Executable<CreatePolymorphicLookupAttributeResponse> {
  constructor(
    public readonly lookup: ComplexLookupAttributeMetadata,
    public readonly oneToManyRelationships: ComplexOneToManyRelationshipMetadata[],
    public readonly solutionUniqueName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreatePolymorphicLookupAttribute`;

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

  async parseResponse(response: Response): Promise<CreatePolymorphicLookupAttributeResponse> {
    const data = await response.json();
    return data as CreatePolymorphicLookupAttributeResponse;
  }
}
