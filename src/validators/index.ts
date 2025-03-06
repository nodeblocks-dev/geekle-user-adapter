import { defaultAdapter } from "@basaldev/blocks-user-service";
import { setInvitableUserIds } from "./setInvitableUserIds";
import { customFieldsValidators } from "./customUserFields";

export function setValidators(adapter: defaultAdapter.UserDefaultAdapter): defaultAdapter.UserDefaultAdapter {
    const customizations = [setInvitableUserIds, ...customFieldsValidators];
  
    for (const customization of customizations) {
        adapter = customization(adapter);
    }
    return adapter;
  }
  