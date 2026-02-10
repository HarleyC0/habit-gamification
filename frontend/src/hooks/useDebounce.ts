import { useState, useEffect } from 'react';

// este hook se encarga de debouncear el input de un formulario para evitar peticiones repetidas innecesarias

export const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    // se ejecuta cuando el valor o el delay cambia
    useEffect(() => {

        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: cancela el timer si el valor cambia antes de que se termine el delay
        return () => {
            clearTimeout(handler);
        };

    }, [value, delay]);

    return debouncedValue;
}