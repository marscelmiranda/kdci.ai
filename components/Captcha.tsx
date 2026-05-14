
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface CaptchaHandle {
  isBot: () => boolean;
}

interface CaptchaProps {
  onVerify?: (verified: boolean) => void;
  theme?: 'dark' | 'light';
}

const MIN_MS = 3000;

function CaptchaInner(props: CaptchaProps, ref: React.Ref<CaptchaHandle>) {
  const mountedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    isBot: () => {
      const elapsed = Date.now() - mountedAt.current;
      const honeypotFilled = !!(honeypotRef.current?.value);
      return honeypotFilled || elapsed < MIN_MS;
    },
  }));

  useEffect(() => {
    props.onVerify?.(true);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
      }}
    >
      <label htmlFor="_hp_website">Website</label>
      <input
        ref={honeypotRef}
        id="_hp_website"
        name="website"
        type="text"
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  );
}

export const Captcha = forwardRef<CaptchaHandle, CaptchaProps>(CaptchaInner);
