import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_assignentity request message
 *
 * Web API Action: msdyn_assignentity
 */
export class msdyn_assignentityRequest
  extends OrganizationRequest
  implements Executable<msdyn_assignentityResponse>
{
  constructor(
    public regardingEntityId: string,
    public regardingEntityName: string,
    public segmentId: string,
    public correlationId: string
  ) {
    super("msdyn_assignentity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_assignentity`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
      SegmentId: this.segmentId,
      CorrelationId: this.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_assignentityResponse> {
    // No return value (204 No Content)
    return new msdyn_assignentityResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
      SegmentId: this.segmentId,
      CorrelationId: this.correlationId,
    };
  }
}

/**
 * msdyn_assignentity response message
 */
export class msdyn_assignentityResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_assignentity");
  }

  static fromResponse(_data: unknown): msdyn_assignentityResponse {
    return new msdyn_assignentityResponse();
  }
}
