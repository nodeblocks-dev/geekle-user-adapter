import {type defaultAdapter } from "@basaldev/blocks-user-service";

export type CustomFieldsValidators = Array<(a: defaultAdapter.UserDefaultAdapter) => defaultAdapter.UserDefaultAdapter>;

export type CustomFields = {
    katakana_name: string;
    profession_category_names: string[];
    skills: string[];
    years_experience: object;
    compensation_type: string;
    compensation_amount: string;
    is_signup_wizard_complete: boolean;
}

export type UpdatedUser = Omit<defaultAdapter.User, 'customFields'> & {
    customFields: CustomFields;
};