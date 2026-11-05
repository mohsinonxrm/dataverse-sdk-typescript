import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
} from "./types/index.js";

/**
 * CreatePolymorphicLookupAttribute request message
 *
 * Web API Action: CreatePolymorphicLookupAttribute
 */
export class CreatePolymorphicLookupAttributeRequest
  extends OrganizationRequest
  implements Executable<CreatePolymorphicLookupAttributeResponse>
{
  constructor(
    public lookup: ComplexLookupAttributeMetadata,
    public oneToManyRelationships: ComplexOneToManyRelationshipMetadata[],
    public solutionUniqueName: string
  ) {
    super("CreatePolymorphicLookupAttribute");
  }

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
    return CreatePolymorphicLookupAttributeResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Lookup: this.lookup,
      OneToManyRelationships: this.oneToManyRelationships,
      SolutionUniqueName: this.solutionUniqueName,
    };
  }
}

/**
 * CreatePolymorphicLookupAttribute response message
 */
export class CreatePolymorphicLookupAttributeResponse extends OrganizationResponse {
  constructor(public result: CreatePolymorphicLookupAttributeResponse) {
    super("CreatePolymorphicLookupAttribute");
  }

  static fromResponse(data: unknown): CreatePolymorphicLookupAttributeResponse {
    return new CreatePolymorphicLookupAttributeResponse((data as any).value);
  }
}
