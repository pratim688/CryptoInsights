const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key];

    if(value === undefined) {
        throw new Error(`Environment variable ${key} is not set. Falling back to default value: ${defaultValue}`);
    }

    return value;
}



export const MONGODB_URI = getEnv("MONGODB_URI") || 'mongodb+srv://adityapanda255:W3o2zq520ORdOADQ@cluster0.vkdn5.mongodb.net/main';
