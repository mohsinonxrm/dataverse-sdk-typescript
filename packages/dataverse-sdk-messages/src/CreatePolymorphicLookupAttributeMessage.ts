import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  ComplexLookupAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
  CreatePolymorphicLookupAttributeResponse as CreatePolymorphicLookupAttributeResponseData,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CreatePolymorphicLookupAttributeResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CreatePolymorphicLookupAttribute response message
 */
export class CreatePolymorphicLookupAttributeResponse extends OrganizationResponse {
  constructor(public result: CreatePolymorphicLookupAttributeResponseData) {
    super("CreatePolymorphicLookupAttribute");
  }

  static fromResponse(data: unknown): CreatePolymorphicLookupAttributeResponse {
    return new CreatePolymorphicLookupAttributeResponse(
      responseObject<CreatePolymorphicLookupAttributeResponseData>(data)
    );
  }
}
