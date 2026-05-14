
import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
  theme?: 'dark' | 'light';
}

export const Captcha = ({ onVerify, theme = 'dark' }: CaptchaProps) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [answer, setAnswer] = useState('');
  const [touched, setTouched] = useState(false);

  const generate = useCallback(() => {
    setA(Math.floor(Math.random() * 9) + 1);
    setB(Math.floor(Math.random() * 9) + 1);
    setAnswer('');
    setTouched(false);
    onVerify(false);
  }, [onVerify]);

  useEffect(() => { generate(); }, []);

  const correct = answer.trim() !== '' && Number(answer.trim()) === a + b;
  const wrong = touched && answer.trim() !== '' && !correct;

  const handleChange = (val: string) => {
    setAnswer(val);
    setTouched(true);
    const num = Number(val.trim());
    if (val.trim() !== '' && !isNaN(num) && num === a + b) {
      onVerify(true);
    } else {
      onVerify(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
      isDark
        ? `bg-white/5 ${wrong ? 'border-red-500/40' : correct ? 'border-green-500/30' : 'border-white/10'}`
        : `bg-slate-50 ${wrong ? 'border-red-400' : correct ? 'border-green-400' : 'border-slate-200'}`
    }`}>
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <span className={`text-[10px] font-black uppercase tracking-widest shrink-0 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
          Verify:
        </span>
        <span className={`text-sm font-bold tabular-nums shrink-0 ${isDark ? 'text-white/70' : 'text-slate-700'}`}>
          {a} + {b} =
        </span>
        <input
          type="number"
          value={answer}
          onChange={e => handleChange(e.target.value)}
          placeholder="?"
          className={`w-14 text-center font-bold text-sm rounded-lg px-2 py-1 border outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            isDark
              ? `bg-white/10 text-white placeholder:text-white/25 ${wrong ? 'border-red-500/50' : correct ? 'border-green-500/40' : 'border-white/20 focus:border-[#E61739]/60'}`
              : `bg-white text-slate-900 placeholder:text-slate-400 ${wrong ? 'border-red-400' : correct ? 'border-green-400' : 'border-slate-300 focus:border-[#E61739]'}`
          }`}
        />
        {correct && <CheckCircle2 size={15} className={`shrink-0 ${isDark ? 'text-green-400' : 'text-green-500'}`} />}
        {wrong && <AlertCircle size={15} className={`shrink-0 ${isDark ? 'text-red-400' : 'text-red-500'}`} />}
        {wrong && <span className={`text-[10px] font-bold shrink-0 ${isDark ? 'text-red-400' : 'text-red-500'}`}>Try again</span>}
      </div>
      <button
        type="button"
        onClick={generate}
        title="New question"
        className={`shrink-0 p-1.5 rounded-lg transition-colors ${
          isDark
            ? 'text-white/25 hover:text-white/60 hover:bg-white/10'
            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
        }`}
      >
        <RefreshCw size={13} />
      </button>
    </div>
  );
};
