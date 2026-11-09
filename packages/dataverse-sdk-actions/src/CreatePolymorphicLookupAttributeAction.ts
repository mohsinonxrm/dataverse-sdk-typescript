import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
} from "./types/index.js";

/**
 * Response from the CreatePolymorphicLookupAttribute action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreatePolymorphicLookupAttributeResponse {
  "@odata.context"?: string;
  AttributeId: string;
  RelationshipIds: string[];
}

/**
 * Parameters of the CreatePolymorphicLookupAttribute action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreatePolymorphicLookupAttributeActionParameters {
  Lookup?: ComplexLookupAttributeMetadata;
  OneToManyRelationships?: ComplexOneToManyRelationshipMetadata[];
  SolutionUniqueName?: string;
}

/**
 * CreatePolymorphicLookupAttribute action
 *
 * Unbound action
 */
export class CreatePolymorphicLookupAttributeAction implements Executable<CreatePolymorphicLookupAttributeResponse> {
  constructor(public readonly parameters: CreatePolymorphicLookupAttributeActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreatePolymorphicLookupAttribute`;

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

  async parseResponse(response: Response): Promise<CreatePolymorphicLookupAttributeResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CreatePolymorphicLookupAttributeResponse;
  }
}
