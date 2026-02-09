import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_configuration } from "./types/index.js";

/**
 * msdyn_CloneMultiple request message
 *
 * Web API Action: msdyn_CloneMultiple
 */
export class msdyn_CloneMultipleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CloneMultipleResponse>
{
  constructor(
    public entityIds: string,
    public queryReference: msdyn_configuration,
    public ufxQuery: string,
    public transformAction: string,
    public transformParams: string
  ) {
    super("msdyn_CloneMultiple");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneMultiple`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      QueryReference: this.queryReference,
      UfxQuery: this.ufxQuery,
      TransformAction: this.transformAction,
      TransformParams: this.transformParams,
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

  async parseResponse(response: Response): Promise<msdyn_CloneMultipleResponse> {
    const data = await response.json();
    return msdyn_CloneMultipleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityIds: this.entityIds,
      QueryReference: this.queryReference,
      UfxQuery: this.ufxQuery,
      TransformAction: this.transformAction,
      TransformParams: this.transformParams,
    };
  }
}

/**
 * msdyn_CloneMultiple response message
 */
export class msdyn_CloneMultipleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CloneMultipleResponse) {
    super("msdyn_CloneMultiple");
  }

  static fromResponse(data: unknown): msdyn_CloneMultipleResponse {
    return new msdyn_CloneMultipleResponse((data as any).value);
  }
}
