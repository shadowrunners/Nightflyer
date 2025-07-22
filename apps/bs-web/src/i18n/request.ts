import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const jar = await cookies();
    const locale = jar.get('bs-locale')?.value ?? 'en';

    return {
        locale,
        messages: (await import(`./locales/${locale}.json`)).default,
    };
});