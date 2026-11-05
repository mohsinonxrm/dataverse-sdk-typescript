import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { appointment } from "./types/index.js";

/**
 * CreateException request message
 *
 * Web API Action: CreateException
 */
export class CreateExceptionRequest
  extends OrganizationRequest
  implements Executable<CreateExceptionResponse>
{
  constructor(
    public target: appointment,
    public originalStartDate: string,
    public isDeleted: boolean
  ) {
    super("CreateException");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateException`;

    const body: Record<string, unknown> = {
      Target: this.target,
      OriginalStartDate: this.originalStartDate,
      IsDeleted: this.isDeleted,
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

  async parseResponse(response: Response): Promise<CreateExceptionResponse> {
    const data = await response.json();
    return CreateExceptionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      OriginalStartDate: this.originalStartDate,
      IsDeleted: this.isDeleted,
    };
  }
}

/**
 * CreateException response message
 */
export class CreateExceptionResponse extends OrganizationResponse {
  constructor(public result: CreateExceptionResponse) {
    super("CreateException");
  }

  static fromResponse(data: unknown): CreateExceptionResponse {
    return new CreateExceptionResponse((data as any).value);
  }
}
