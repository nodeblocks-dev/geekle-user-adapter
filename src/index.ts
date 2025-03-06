import { defaultAdapter, UserAppConfig, createNodeblocksUserApp } from "@basaldev/blocks-user-service";
import * as sdk from "@basaldev/blocks-backend-sdk";
import { changePasswordTemplate } from "./emails/templates/changePassword";
import { verifyChangeEmailTemplate } from "./emails/templates/verifyChangeEmail";
import { sendResetPasswordEmailTemplate } from "./emails/templates/sendResetPasswordEmail";
import { setValidators } from "./validators";
import { catalogDefaultAdapterRestSdk } from "./helpers";
import { AttributeItems, CategoryResponse } from "@basaldev/blocks-default-adapter-api";
import { setEmailHandlers } from "./emails";

type CreateUserDefaultAdapterDependencies = Parameters<typeof defaultAdapter.createUserDefaultAdapter>[1];

  
interface Skill {
  [key: string]: AttributeItems;
}

interface Category {
  [key: string]: CategoryResponse;
}

const skillsExpander: sdk.util.Expander = async ids => {
  const skills: Skill = {};
  const skillsResult = await catalogDefaultAdapterRestSdk.getAttributes({
    queryOptions: {
      filter: "name eq 'skills'",
    },
  });
  if (skillsResult.value.length && skillsResult.value[0].items) {
    skillsResult.value[0].items.forEach((skill: AttributeItems) => {
      skills[skill.key] = {...skill};
    });
  }

  return ids.map(skillKey => skills[skillKey] ?? null);
};

const professionCategoryIdsExpander: sdk.util.Expander = async ids => {
  const categories: Category = {};
  const categoriesResult = await catalogDefaultAdapterRestSdk.getCategories({
    queryOptions: {
      filter: "status eq 'ACTIVE'",
    },
  });
  categoriesResult.value.forEach((category: CategoryResponse) => {
    categories[category.name] = category;
  });

  return ids.map(categoryName => categories[categoryName] ?? null);
};


export const customUserFields: sdk.util.CustomField[] = [
  {
    name: 'katakana_name',
    type: 'string',
  },
  {
    expander: professionCategoryIdsExpander,
    name: 'profession_category_names',
    type: 'array',
  },
  {
    expander: skillsExpander,
    name: 'skills',
    type: 'array',
  },
  {
    name: 'years_experience',
    type: 'object',
  },
  {
    name: 'compensation_type',
    type: 'string',
  },
  {
    name: 'compensation_amount',
    type: 'string',
  },
  {
    name: 'is_signup_wizard_complete',
    type: 'boolean',
  },
];

export function beforeCreateAdapter(
  currentOptions: defaultAdapter.UserDefaultAdapterOptions,
  currentDependencies: CreateUserDefaultAdapterDependencies): [defaultAdapter.UserDefaultAdapterOptions, CreateUserDefaultAdapterDependencies] {

  const updatedOptions: defaultAdapter.UserDefaultAdapterOptions = {
    ...currentOptions,
    customFields: {
      user: customUserFields,
    },
    authenticate: sdk.security.defaultBearerAuth,
    emailConfig: {
      changePassword: {
        adminTemplate: {
          bodyTemplate: changePasswordTemplate.admin.bodyTemplate,
          subject: changePasswordTemplate.admin.subject,
          urlTemplate: changePasswordTemplate.admin.urlTemplate
        },
        customerTemplate: {
          bodyTemplate: changePasswordTemplate.customer.bodyTemplate,
          subject: changePasswordTemplate.customer.subject,
          urlTemplate: changePasswordTemplate.customer.urlTemplate
        },
        vendorTemplate: {
          bodyTemplate: changePasswordTemplate.vendor.bodyTemplate,
          subject: changePasswordTemplate.vendor.subject,
          urlTemplate: changePasswordTemplate.vendor.urlTemplate
        },
        enabled: changePasswordTemplate.enabled
      },
      verifyChangeEmail: {
        adminTemplate: {
          bodyTemplate: verifyChangeEmailTemplate.admin.bodyTemplate,
          subject: verifyChangeEmailTemplate.admin.subject,
          urlTemplate: verifyChangeEmailTemplate.admin.urlTemplate
        },
        customerTemplate: {
          bodyTemplate: verifyChangeEmailTemplate.customer.bodyTemplate,
          subject: verifyChangeEmailTemplate.customer.subject,
          urlTemplate: verifyChangeEmailTemplate.customer.urlTemplate
        },
        vendorTemplate: {
          bodyTemplate: verifyChangeEmailTemplate.vendor.bodyTemplate,
          subject: verifyChangeEmailTemplate.vendor.subject,
          urlTemplate: verifyChangeEmailTemplate.vendor.urlTemplate
        },
        enabled: verifyChangeEmailTemplate.enabled
      },
      sendResetPasswordEmail: {
        adminTemplate: {
          bodyTemplate: sendResetPasswordEmailTemplate.admin.bodyTemplate,
          subject: sendResetPasswordEmailTemplate.admin.subject,
          urlTemplate: sendResetPasswordEmailTemplate.admin.urlTemplate
        },
        customerTemplate: {
          bodyTemplate: sendResetPasswordEmailTemplate.customer.bodyTemplate,
          subject: sendResetPasswordEmailTemplate.customer.subject,
          urlTemplate: sendResetPasswordEmailTemplate.customer.urlTemplate
        },
        vendorTemplate: {
          bodyTemplate: sendResetPasswordEmailTemplate.vendor.bodyTemplate,
          subject: sendResetPasswordEmailTemplate.vendor.subject,
          urlTemplate: sendResetPasswordEmailTemplate.vendor.urlTemplate
        },
        enabled: sendResetPasswordEmailTemplate.enabled
      },
    }
  };

  const updatedDependencies: CreateUserDefaultAdapterDependencies = {
    ...currentDependencies
  };

  return [updatedOptions, updatedDependencies];
}

export async function adapterCreated(adapter: defaultAdapter.UserDefaultAdapter): Promise<defaultAdapter.UserDefaultAdapter> {
  let updatedAdapter = sdk.adapter.setEnabledAdapterMethods(adapter, [
      'getUser',
      'resetPassword',
      'sendResetPasswordEmail',
      'sendVerificationEmail',
      'updateUser',
      'verifyEmail',
      'changeUserEmail',
      'verifyChangeEmail',
      'changeUserPassword',
      'deactivateUser',
      'acceptInvitation',
      'createInvitation',
      'deleteInvitation',
      'listInvitations',
      'listUsers',
      'deleteUser',
      'lockUser',
      'unlockUser',
      'checkUserPassword',
      'createUser',
      'createUserForAdmin',
      'listAttachments',
    ]
  );
  updatedAdapter = setValidators(updatedAdapter);
  updatedAdapter = await setEmailHandlers(updatedAdapter);

  return updatedAdapter;
}

export function beforeCreateService(currentConfigs: UserAppConfig): UserAppConfig {
  const updatedConfigs = {
    ...currentConfigs
  };

  return updatedConfigs;
}

export function serviceCreated() {}

type StartServiceArgs = Parameters<ReturnType<typeof createNodeblocksUserApp>['startService']>;
type ServiceOpts = StartServiceArgs[0];

export function beforeStartService(currentOptions: ServiceOpts): StartServiceArgs {
  const updatedOptions = {
    ...currentOptions,
  };
  return [updatedOptions];
}

export function serviceStarted() {}
