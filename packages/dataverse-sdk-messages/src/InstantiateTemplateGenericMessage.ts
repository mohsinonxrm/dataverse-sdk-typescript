import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the InstantiateTemplateGeneric message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateTemplateGenericRequestParameters {
  TemplateId: string;
  ObjectType: string;
  ObjectId: string;
  EntityLogicalName?: string;
}

/**
 * InstantiateTemplateGeneric request message
 *
 * Web API Action: InstantiateTemplateGeneric
 */
export class InstantiateTemplateGenericRequest
  extends OrganizationRequest
  implements Executable<InstantiateTemplateGenericResponse>
{
  declare readonly Parameters: Readonly<InstantiateTemplateGenericRequestParameters>;

  constructor(parameters: InstantiateTemplateGenericRequestParameters) {
    super("InstantiateTemplateGeneric", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplateGeneric`;

    const body = requestBody({
      TemplateId: this.Parameters.TemplateId,
      ObjectType: this.Parameters.ObjectType,
      ObjectId: this.Parameters.ObjectId,
      EntityLogicalName: this.Parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<InstantiateTemplateGenericResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return InstantiateTemplateGenericResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return InstantiateTemplateGenericResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InstantiateTemplateGeneric action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type InstantiateTemplateGenericResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * InstantiateTemplateGeneric response message
 *
 * `result` is the value the InstantiateTemplateGeneric action returns (see {@link InstantiateTemplateGenericResult}).
 */
export class InstantiateTemplateGenericResponse extends OrganizationResponse {
  constructor(public result: InstantiateTemplateGenericResult) {
    super("InstantiateTemplateGeneric");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InstantiateTemplateGenericResponse {
    return new InstantiateTemplateGenericResponse(
      data === undefined ? [] : (data as { value: InstantiateTemplateGenericResult }).value
    );
  }
}
