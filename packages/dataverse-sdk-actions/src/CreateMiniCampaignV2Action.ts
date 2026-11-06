import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CreateMiniCampaignV2 action
 */
export interface CreateMiniCampaignV2Response {
  BulkOperationId: string;
}

/**
 * Parameters of the CreateMiniCampaignV2 action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateMiniCampaignV2ActionParameters {
  MiniCampaignForTypeCode: number;
  TemplateId: string;
  TargetOption: number;
  TargetIds: string;
  FetchXml: string;
  MiniCampaignType: string;
  ActivitiesOwnerOption: number;
  ActivityXml: string;
  MiniCampaignName: string;
  PostWorkflowEvent: boolean;
  OwnerId: string;
  OwnerTypeCode: number;
  sendEmail: boolean;
  QueueId?: string;
}

/**
 * CreateMiniCampaignV2 action
 *
 * Unbound action
 */
export class CreateMiniCampaignV2Action implements Executable<CreateMiniCampaignV2Response> {
  constructor(public readonly parameters: CreateMiniCampaignV2ActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateMiniCampaignV2`;

    const body = requestBody({
      MiniCampaignForTypeCode: this.parameters.MiniCampaignForTypeCode,
      TemplateId: this.parameters.TemplateId,
      TargetOption: this.parameters.TargetOption,
      TargetIds: this.parameters.TargetIds,
      FetchXml: this.parameters.FetchXml,
      MiniCampaignType: this.parameters.MiniCampaignType,
      ActivitiesOwnerOption: this.parameters.ActivitiesOwnerOption,
      ActivityXml: this.parameters.ActivityXml,
      MiniCampaignName: this.parameters.MiniCampaignName,
      PostWorkflowEvent: this.parameters.PostWorkflowEvent,
      OwnerId: this.parameters.OwnerId,
      OwnerTypeCode: this.parameters.OwnerTypeCode,
      sendEmail: this.parameters.sendEmail,
      QueueId: this.parameters.QueueId,
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

  async parseResponse(response: Response): Promise<CreateMiniCampaignV2Response> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CreateMiniCampaignV2Response;
  }
}
