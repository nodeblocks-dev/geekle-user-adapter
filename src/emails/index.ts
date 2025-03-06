import { defaultAdapter } from "@basaldev/blocks-user-service";
import * as sdk from '@basaldev/blocks-backend-sdk';
import { sendEmailToNewRegisteredUsers } from "./sendEmailToNewRegisteredUsers";
import { sendCustomInviteEmail } from "./sendCustomInviteEmail";

  
export async function setEmailHandlers(adapter: defaultAdapter.UserDefaultAdapter) {
  // let invites = sendCustomInviteEmail(adapter);

  // let updatedAdapter = sdk.adapter.addHandlerSideEffect(
  //   adapter,
  //   invites.methodName,
  //   invites.handlerSideEffect
  // );

  const newRegisteredUsers = sendEmailToNewRegisteredUsers(adapter);

  const updatedAdapter = sdk.adapter.addHandlerSideEffect(
    adapter,
    newRegisteredUsers.methodName,
    newRegisteredUsers.handlerSideEffect
  );

  return updatedAdapter;
}

