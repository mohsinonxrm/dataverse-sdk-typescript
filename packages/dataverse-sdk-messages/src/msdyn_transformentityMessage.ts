import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_transformentity request message
 *
 * Web API Action: msdyn_transformentity
 */
export class msdyn_transformentityRequest
  extends OrganizationRequest
  implements Executable<msdyn_transformentityResponse>
{
  constructor(
    public entity: EntityReference,
    public params: EntityReference
  ) {
    super("msdyn_transformentity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_transformentity`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
      Params: this.params,
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

  async parseResponse(response: Response): Promise<msdyn_transformentityResponse> {
    const data = await response.json();
    return msdyn_transformentityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Entity: this.entity,
      Params: this.params,
    };
  }
}

/**
 * msdyn_transformentity response message
 */
export class msdyn_transformentityResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("msdyn_transformentity");
  }

  static fromResponse(data: unknown): msdyn_transformentityResponse {
    return new msdyn_transformentityResponse((data as any).value);
  }
}
