import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { CreateAndSendNewEmailResponse as CreateAndSendNewEmailResponseData } from "./types/index.js";

/**
 * CreateAndSendNewEmail request message
 *
 * Web API Action: CreateAndSendNewEmail
 */
export class CreateAndSendNewEmailRequest
  extends OrganizationRequest
  implements Executable<CreateAndSendNewEmailResponse>
{
  constructor(
    public subject: string,
    public body: string,
    public from: string,
    public to: string,
    public cc: string,
    public bcc: string,
    public regarding: EntityReference,
    public importance: number
  ) {
    super("CreateAndSendNewEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateAndSendNewEmail`;

    const body: Record<string, unknown> = {
      Subject: this.subject,
      Body: this.body,
      From: this.from,
      To: this.to,
      Cc: this.cc,
      Bcc: this.bcc,
      Regarding: this.regarding,
      Importance: this.importance,
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

  async parseResponse(response: Response): Promise<CreateAndSendNewEmailResponse> {
    const data = await response.json();
    return CreateAndSendNewEmailResponse.fromResponse(data);
  }
}

/**
 * CreateAndSendNewEmail response message
 */
export class CreateAndSendNewEmailResponse extends OrganizationResponse {
  constructor(public result: CreateAndSendNewEmailResponseData) {
    super("CreateAndSendNewEmail");
  }

  static fromResponse(data: unknown): CreateAndSendNewEmailResponse {
    return new CreateAndSendNewEmailResponse(
      responseObject<CreateAndSendNewEmailResponseData>(data)
    );
  }
}
