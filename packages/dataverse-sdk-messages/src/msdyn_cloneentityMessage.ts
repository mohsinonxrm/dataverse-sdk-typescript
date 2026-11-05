import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_cloneentity request message
 *
 * Web API Action: msdyn_cloneentity
 */
export class msdyn_cloneentityRequest
  extends OrganizationRequest
  implements Executable<msdyn_cloneentityResponse>
{
  constructor(
    public sourceEntity: EntityReference,
    public queryReference: EntityReference,
    public transformAction: string,
    public transformParams: EntityReference
  ) {
    super("msdyn_cloneentity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_cloneentity`;

    const body: Record<string, unknown> = {
      SourceEntity: this.sourceEntity,
      QueryReference: this.queryReference,
      TransformAction: this.transformAction,
      TransformParams: this.transformParams,
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

  async parseResponse(response: Response): Promise<msdyn_cloneentityResponse> {
    const data = await response.json();
    return msdyn_cloneentityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SourceEntity: this.sourceEntity,
      QueryReference: this.queryReference,
      TransformAction: this.transformAction,
      TransformParams: this.transformParams,
    };
  }
}

/**
 * msdyn_cloneentity response message
 */
export class msdyn_cloneentityResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("msdyn_cloneentity");
  }

  static fromResponse(data: unknown): msdyn_cloneentityResponse {
    return new msdyn_cloneentityResponse((data as any).value);
  }
}
