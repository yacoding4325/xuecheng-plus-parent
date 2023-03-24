export const isValidUserName = (str: string) => ['admin', 'editor', 'repairer', 'operater'].indexOf(str.trim()) >= 0;
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);
