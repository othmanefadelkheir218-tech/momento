import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

export default function useScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}
