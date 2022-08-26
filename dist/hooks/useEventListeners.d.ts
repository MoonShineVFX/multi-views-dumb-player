import React from 'react';
export default function useEventListeners(ref: React.RefObject<HTMLElement>, eventNames: string[], callback: (event: Event) => void, options?: AddEventListenerOptions): void;
