export interface Environment {
    environment: 'dev' | 'staging' | 'production';
    productionBuild: boolean;
    apiUrl: string;
    sentryDsn: string;
    packageName: string;
    packageVersion: string;
}

export interface LoadState {
    isLoading: boolean;
    hasLoaded: boolean;
    hasError: boolean;
}
  