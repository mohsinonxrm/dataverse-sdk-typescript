import type { adx_inviteredemption } from "./adx_inviteredemption.js";
import type { adx_portalcomment } from "./adx_portalcomment.js";
import type { appointment } from "./appointment.js";
import type { bulkoperation } from "./bulkoperation.js";
import type { campaignactivity } from "./campaignactivity.js";
import type { campaignresponse } from "./campaignresponse.js";
import type { chat } from "./chat.js";
import type { email } from "./email.js";
import type { fax } from "./fax.js";
import type { incidentresolution } from "./incidentresolution.js";
import type { letter } from "./letter.js";
import type { msdyn_bookingalert } from "./msdyn_bookingalert.js";
import type { msdyn_copilottranscript } from "./msdyn_copilottranscript.js";
import type { msdyn_ocliveworkitem } from "./msdyn_ocliveworkitem.js";
import type { msdyn_ocoutboundmessage } from "./msdyn_ocoutboundmessage.js";
import type { msdyn_ocsession } from "./msdyn_ocsession.js";
import type { msdyn_ocvoicemail } from "./msdyn_ocvoicemail.js";
import type { msfp_alert } from "./msfp_alert.js";
import type { msfp_surveyinvite } from "./msfp_surveyinvite.js";
import type { msfp_surveyresponse } from "./msfp_surveyresponse.js";
import type { opportunityclose } from "./opportunityclose.js";
import type { orderclose } from "./orderclose.js";
import type { phonecall } from "./phonecall.js";
import type { quoteclose } from "./quoteclose.js";
import type { recurringappointmentmaster } from "./recurringappointmentmaster.js";
import type { serviceappointment } from "./serviceappointment.js";
import type { socialactivity } from "./socialactivity.js";
import type { task } from "./task.js";

/**
 * activitypointer entity type
 */
export interface activitypointer {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _regardingobjectid_value?: string;
  _sendermailboxid_value?: string;
  _serviceid_value?: string;
  _slaid_value?: string;
  _slainvokedid_value?: string;
  _transactioncurrencyid_value?: string;
  activityadditionalparams?: string;
  activityid?: string;
  activitytypecode?: string;
  actualdurationminutes?: number;
  actualend?: string;
  actualstart?: string;
  community?: number;
  createdon?: string;
  deliverylastattemptedon?: string;
  deliveryprioritycode?: number;
  description?: string;
  descriptionblobid?: string;
  descriptionblobid_name?: string;
  exchangeitemid?: string;
  exchangerate?: number;
  exchangeweblink?: string;
  formattedscheduledend?: string;
  formattedscheduledstart?: string;
  instancetypecode?: number;
  isbilled?: boolean;
  ismapiprivate?: boolean;
  isregularactivity?: boolean;
  isworkflowcreated?: boolean;
  lastonholdtime?: string;
  leftvoicemail?: boolean;
  modifiedon?: string;
  onholdtime?: number;
  postponeactivityprocessinguntil?: string;
  prioritycode?: number;
  processid?: string;
  scheduleddurationminutes?: number;
  scheduledend?: string;
  scheduledstart?: string;
  senton?: string;
  seriesid?: string;
  sortdate?: string;
  stageid?: string;
  statecode?: number;
  statuscode?: number;
  subject?: string;
  timezoneruleversionnumber?: number;
  traversedpath?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}

/**
 * A activitypointer value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedActivitypointer =
  | (adx_inviteredemption & { "@odata.type": "Microsoft.Dynamics.CRM.adx_inviteredemption" })
  | (adx_portalcomment & { "@odata.type": "Microsoft.Dynamics.CRM.adx_portalcomment" })
  | (appointment & { "@odata.type": "Microsoft.Dynamics.CRM.appointment" })
  | (bulkoperation & { "@odata.type": "Microsoft.Dynamics.CRM.bulkoperation" })
  | (campaignactivity & { "@odata.type": "Microsoft.Dynamics.CRM.campaignactivity" })
  | (campaignresponse & { "@odata.type": "Microsoft.Dynamics.CRM.campaignresponse" })
  | (chat & { "@odata.type": "Microsoft.Dynamics.CRM.chat" })
  | (email & { "@odata.type": "Microsoft.Dynamics.CRM.email" })
  | (fax & { "@odata.type": "Microsoft.Dynamics.CRM.fax" })
  | (incidentresolution & { "@odata.type": "Microsoft.Dynamics.CRM.incidentresolution" })
  | (letter & { "@odata.type": "Microsoft.Dynamics.CRM.letter" })
  | (msdyn_bookingalert & { "@odata.type": "Microsoft.Dynamics.CRM.msdyn_bookingalert" })
  | (msdyn_copilottranscript & { "@odata.type": "Microsoft.Dynamics.CRM.msdyn_copilottranscript" })
  | (msdyn_ocliveworkitem & { "@odata.type": "Microsoft.Dynamics.CRM.msdyn_ocliveworkitem" })
  | (msdyn_ocoutboundmessage & { "@odata.type": "Microsoft.Dynamics.CRM.msdyn_ocoutboundmessage" })
  | (msdyn_ocsession & { "@odata.type": "Microsoft.Dynamics.CRM.msdyn_ocsession" })
  | (msdyn_ocvoicemail & { "@odata.type": "Microsoft.Dynamics.CRM.msdyn_ocvoicemail" })
  | (msfp_alert & { "@odata.type": "Microsoft.Dynamics.CRM.msfp_alert" })
  | (msfp_surveyinvite & { "@odata.type": "Microsoft.Dynamics.CRM.msfp_surveyinvite" })
  | (msfp_surveyresponse & { "@odata.type": "Microsoft.Dynamics.CRM.msfp_surveyresponse" })
  | (opportunityclose & { "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose" })
  | (orderclose & { "@odata.type": "Microsoft.Dynamics.CRM.orderclose" })
  | (phonecall & { "@odata.type": "Microsoft.Dynamics.CRM.phonecall" })
  | (quoteclose & { "@odata.type": "Microsoft.Dynamics.CRM.quoteclose" })
  | (recurringappointmentmaster & {
      "@odata.type": "Microsoft.Dynamics.CRM.recurringappointmentmaster";
    })
  | (serviceappointment & { "@odata.type": "Microsoft.Dynamics.CRM.serviceappointment" })
  | (socialactivity & { "@odata.type": "Microsoft.Dynamics.CRM.socialactivity" })
  | (task & { "@odata.type": "Microsoft.Dynamics.CRM.task" });
