import { defaultAdapter } from "@basaldev/blocks-user-service";
import * as sdk from '@basaldev/blocks-backend-sdk';
import { Logger } from "@basaldev/blocks-backend-sdk";
import { getEnvString } from "../helpers";
import { inviteUserTemplate } from "./templates/inviteUser";


  

export function sendCustomInviteEmail(adapter: defaultAdapter.UserDefaultAdapter): {
    adapter: defaultAdapter.UserDefaultAdapter;
    methodName: 'createInvitation';
    handlerSideEffect: sdk.util.HandlerSideEffect<defaultAdapter.CreateInvitationDto>;
  } {
    const sendInviteEmails: sdk.util.HandlerSideEffect<
      defaultAdapter.CreateInvitationDto
    > = async (
      logger: Logger,
      context: sdk.adapter.AdapterHandlerContext,
      response: sdk.adapter.AdapterHandlerResponse,
    ) => {
      const invite = context.body as defaultAdapter.CreateInvitationDto;
      const user = await adapter.dataServices.user.getUserById(logger, invite.fromUserId);

      const isAdmin = user.typeId === defaultAdapter.TYPE_ID_SYSTEM_ADMIN;
  
      const html = sdk.util.buildContentFromTemplateString(
        isAdmin ? inviteUserTemplate.admin.bodyTemplate : inviteUserTemplate.vendor.bodyTemplate,
        {}
      );
      
      const subject = isAdmin ? inviteUserTemplate.admin.subject : inviteUserTemplate.vendor.subject;
      const to = invite.email;
      const from = getEnvString('ADAPTER_EMAIL_SENDER', '');
      const mailData = {
        from,
        html,
        subject,
        to: to as unknown as string,
      };
      logger.info(mailData);
      const didSend = adapter.dependencies.mailService.sendMail(mailData);
      if (!didSend) {
        logger.error({
          message: 'Failed to send email',
          ...mailData,
        });
      }

      return response;
    };
  
    return {
      adapter,
      methodName: 'createInvitation',
      handlerSideEffect: sendInviteEmails,
    };
  }
  
  