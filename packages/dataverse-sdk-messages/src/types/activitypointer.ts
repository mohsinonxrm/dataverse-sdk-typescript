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
  _transactioncurrencyid_value?: string;
  _slainvokedid_value?: string;
  _createdby_value?: string;
  onholdtime?: number;
  _ownerid_value?: string;
  leftvoicemail?: boolean;
  _owningteam_value?: string;
  scheduleddurationminutes?: number;
  description?: string;
  deliverylastattemptedon?: string;
  exchangerate?: number;
  isbilled?: boolean;
  instancetypecode?: number;
  senton?: string;
  processid?: string;
  _owningbusinessunit_value?: string;
  traversedpath?: string;
  scheduledstart?: string;
  descriptionblobid?: string;
  activityadditionalparams?: string;
  subject?: string;
  _modifiedby_value?: string;
  _serviceid_value?: string;
  sortdate?: string;
  descriptionblobid_name?: string;
  community?: number;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  formattedscheduledstart?: string;
  _regardingobjectid_value?: string;
  actualdurationminutes?: number;
  lastonholdtime?: string;
  isworkflowcreated?: boolean;
  scheduledend?: string;
  isregularactivity?: boolean;
  exchangeweblink?: string;
  _slaid_value?: string;
  _owninguser_value?: string;
  ismapiprivate?: boolean;
  activityid?: string;
  formattedscheduledend?: string;
  exchangeitemid?: string;
  _sendermailboxid_value?: string;
  stageid?: string;
  seriesid?: string;
  modifiedon?: string;
  createdon?: string;
  postponeactivityprocessinguntil?: string;
  activitytypecode?: string;
  statuscode?: number;
  statecode?: number;
  _modifiedonbehalfby_value?: string;
  actualstart?: string;
  prioritycode?: number;
  deliveryprioritycode?: number;
  actualend?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
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
