import { getEnvBool, getEnvString } from "../../helpers";

export const sendResetPasswordEmailTemplate = {
  admin: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <p>下記のURLよりパスワードの再設定を行なってください。</p>
      <p><a href="\${url}">\${url}</a></p>
      <p>*※本メールは送信専用のメールアドレスで送信しております。</p>
      <p>本メールにご返信いただいてもお答えできません。あらかじめご了承ください。</p>
      <br />
      <p>Geekle</p>
      <a href="${getEnvString('ADAPTER_CUSTOM_ADMIN_SITE_URL')}">${getEnvString('ADAPTER_CUSTOM_ADMIN_SITE_URL')}</a>
      <br />
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: 'パスワードの再設定',
    urlTemplate: `${getEnvString('ADAPTER_CUSTOM_ADMIN_SITE_URL')}/auth/reset-password-submit/` + '${token}'
  },
  customer: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <p>下記のURLよりパスワードの再設定を行なってください。</p>
      <p><a href="\${url}">\${url}</a></p>
      <p>*※本メールは送信専用のメールアドレスで送信しております。</p>
      <p>本メールにご返信いただいてもお答えできません。あらかじめご了承ください。</p>
      <br />
      <p>Geekle</p>
      <a href="${getEnvString('ADAPTER_CUSTOM_DEMAND_SITE_URL')}">${getEnvString('ADAPTER_CUSTOM_DEMAND_SITE_URL')}</a>
      <br />
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: 'パスワードの再設定',
    urlTemplate: `${getEnvString('ADAPTER_CUSTOM_DEMAND_SITE_URL')}/auth/reset-password-submit/` + '${token}'
  },
  vendor: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <p>下記のURLよりパスワードの再設定を行なってください。</p>
      <p><a href="\${url}">\${url}</a></p>
      <p>*※本メールは送信専用のメールアドレスで送信しております。</p>
      <p>本メールにご返信いただいてもお答えできません。あらかじめご了承ください。</p>
      <br />
      <p>Geekle</p>
      <a href="${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}">${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}</a>
      <br />
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: 'パスワードの再設定',
    urlTemplate: `${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}/auth/reset-password-submit/` + '${token}'
  },
  enabled: getEnvBool('ADAPTER_EMAIL_RESET_PASSWORD_ENABLED')
};
