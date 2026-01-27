import pkg from '../../../package.json' with { type: 'json' };

export const appVersion = pkg.version;
export const githubRepo = pkg.homepage;
export const environment = process.env.PLAYWRIGHT_TEST === 'true' ? 'testing' :
    process.env.NODE_ENV === 'development' ? 'development' : 'production';
