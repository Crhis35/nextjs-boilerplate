import React from 'react';

import { makeLocalStorageAdapter } from 'data/services/local-storage';
import { StorageProps } from './use-storage.model';

export default function useStorage({
  key,
  initialValue,
  options,
}: StorageProps<string>) {
  const opts = React.useMemo(() => {
    return {
      serializer: JSON.stringify,
      parser: JSON.parse,
      logger: console.error,
      syncData: true,
      ...options,
    };
  }, [options]);

  const { serializer, parser, logger } = opts;
  const rawValueRef = React.useRef<string | null>(null);

  const [storedValue, setStoredValue] = React.useState<string>(() => {
    try {
      rawValueRef.current = makeLocalStorageAdapter().get(key);
      const res = rawValueRef.current
        ? parser(rawValueRef.current)
        : initialValue;
      return res;
    } catch (e) {
      logger(e);
      return initialValue;
    }
  });

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const updateLocalStorage = () => {
      if (storedValue !== undefined) {
        const newValue = serializer(storedValue);
        rawValueRef.current = newValue;
        makeLocalStorageAdapter().set(key, newValue);
      }
    };

    try {
      updateLocalStorage();
    } catch (e) {
      logger(e);
    }
  }, [key, logger, serializer, storedValue]);

  /**
   * Sets a new value in the local storage and updates the state.
   *
   * @param {string} value - The new value to be stored. It can be a function or value.
   */
  const setValue = async (valueToStore: string) => {
    try {
      setLoading(true);
      setStoredValue(valueToStore);
      makeLocalStorageAdapter().set(key, serializer(valueToStore));
    } catch (error) {
      logger(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Removes the stored value from local storage.
   */
  const removeValue = async () => {
    try {
      setLoading(true);
      makeLocalStorageAdapter().set(key, '');
    } catch (error) {
      logger(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, storedValue, setValue, removeValue };
}
