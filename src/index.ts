import { defaultAdapter, UserAppConfig, createNodeblocksUserApp } from "@basaldev/blocks-user-service";
type CreateUserDefaultAdapterDependencies = Parameters<typeof defaultAdapter.createUserDefaultAdapter>[1];

export function beforeCreateAdapter(
  currentOptions: defaultAdapter.UserDefaultAdapterOptions,
  currentDependencies: CreateUserDefaultAdapterDependencies): [defaultAdapter.UserDefaultAdapterOptions, CreateUserDefaultAdapterDependencies] {

  const updatedOptions: defaultAdapter.UserDefaultAdapterOptions = {
    ...currentOptions
  };

  const updatedDependencies: CreateUserDefaultAdapterDependencies = {
    ...currentDependencies
  };

  return [updatedOptions, updatedDependencies];
}

export function adapterCreated(adapter: defaultAdapter.UserDefaultAdapter): defaultAdapter.UserDefaultAdapter {
  const updatedAdapter = adapter;

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
