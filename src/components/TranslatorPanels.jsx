import { useState, useEffect } from 'react';
import { BCP47 } from '../utils/translate';
import styles from './TranslatorPanels.module.css';

/* ─────────────────────────────────────────────
   Speak helper — works reliably in Chrome
───────────────────────────────────────────── */
function speakText(text, langCode, onStateChange) {
  if (!text.trim()) {
    alert('Pehle kuch text likho!');
    return;
  }
  if (!('speechSynthesis' in window)) {
    alert('Aapka browser Text-to-Speech support nahi karta.');
    return;
  }

  // If already speaking, stop it
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
    onStateChange && onStateChange(false);
    return;
  }

  const utt = new SpeechSynthesisUtterance(text);
  const code = langCode === 'auto' ? 'en' : langCode;
  utt.lang = BCP47[code] || code;
  utt.rate = 0.85;
  utt.pitch = 1;
  utt.volume = 1;

  utt.onstart  = () => onStateChange && onStateChange(true);
  utt.onend    = () => onStateChange && onStateChange(false);
  utt.onerror  = () => { onStateChange && onStateChange(false); };

  // Chrome bug fix: cancel before speaking
  window.speechSynthesis.cancel();
  setTimeout(() => window.speechSynthesis.speak(utt), 100);
}

/* ─────────────────────────────────────────────
   SOURCE PANEL
───────────────────────────────────────────── */
export function SourcePanel({ value, onChange, onClear, langCode, detectedLang }) {
  const [speaking, setSpeaking] = useState(false);

  const maxLen     = 10000;
  const charCount  = value.length;
  const counterClass =
    charCount > 9000 ? styles.counterDanger :
    charCount > 7000 ? styles.counterWarn :
    styles.counter;

  // Clean up speech on unmount
  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  function handleSpeak() {
    speakText(value, langCode, setSpeaking);
  }

  function handleClear() {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    onClear();
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.langBadge}>
          <span className={styles.dot} />
          {langCode === 'auto' ? 'Auto-detect' : langCode.toUpperCase()}
          {detectedLang && (
            <span className={styles.detectedBadge}>✦ Detected: {detectedLang}</span>
          )}
        </div>

        <div className={styles.actions}>
          {/* Speak button */}
          <button
            className={`${styles.iconBtn} ${speaking ? styles.iconBtnActive : ''}`}
            onClick={handleSpeak}
            title={speaking ? 'Stop speaking' : 'Speak this text'}
            aria-label={speaking ? 'Stop speaking' : 'Speak source text'}
          >
            {speaking ? '⏹' : '🔊'}
          </button>

          {/* Clear button */}
          <button
            className={styles.iconBtn}
            onClick={handleClear}
            title="Clear text"
            aria-label="Clear text"
          >
            🗑️
          </button>
        </div>
      </div>

      <textarea
        className={styles.textarea}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Type or paste text here… (No character limit!)"
        maxLength={maxLen}
        aria-label="Text to translate"
        spellCheck
      />

      <div className={counterClass}>
        <span>{charCount.toLocaleString()} / {maxLen.toLocaleString()} characters</span>
        {value.length > 490 && (
          <span className={styles.chunkInfo}>
            ✦ ~{Math.ceil(charCount / 490)} chunks (unlimited!)
          </span>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OUTPUT PANEL
───────────────────────────────────────────── */
export function OutputPanel({ value, isLoading, progress, onCopy, targetLangCode, copied }) {
  const [speaking, setSpeaking]     = useState(false);
  const [copyFlash, setCopyFlash]   = useState(false);

  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  function handleSpeak() {
    if (!value.trim()) {
      alert('Pehle kuch translate karo!');
      return;
    }
    speakText(value, targetLangCode, setSpeaking);
  }

  function handleCopy() {
    if (!value.trim()) {
      alert('Koi translated text nahi hai abhi!');
      return;
    }

    // Try Clipboard API first, fallback to execCommand
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value)
        .then(() => {
          setCopyFlash(true);
          setTimeout(() => setCopyFlash(false), 2000);
          onCopy && onCopy();
        })
        .catch(() => fallbackCopy(value));
    } else {
      fallbackCopy(value);
    }
  }

  function fallbackCopy(text) {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      setCopyFlash(true);
      setTimeout(() => setCopyFlash(false), 2000);
      onCopy && onCopy();
    } catch {
      alert('Copy nahi hua — text manually select karke copy karo.');
    }
    document.body.removeChild(el);
  }

  return (
    <div className={`${styles.panel} ${styles.outputPanel}`}>
      <div className={styles.panelHeader}>
        <div className={styles.langBadge}>
          <span className={`${styles.dot} ${styles.dotCyan}`} />
          {targetLangCode ? targetLangCode.toUpperCase() : 'Translation'}
        </div>

        <div className={styles.actions}>
          {/* Speak translated text */}
          <button
            className={`${styles.iconBtn} ${speaking ? styles.iconBtnActive : ''}`}
            onClick={handleSpeak}
            title={speaking ? 'Stop' : 'Speak translation'}
            aria-label={speaking ? 'Stop speaking' : 'Speak translation'}
          >
            {speaking ? '⏹' : '🔊'}
          </button>

          {/* Copy button */}
          <button
            className={`${styles.iconBtn} ${(copied || copyFlash) ? styles.iconBtnCopied : ''}`}
            onClick={handleCopy}
            title="Copy translation"
            aria-label="Copy translation"
          >
            {(copied || copyFlash) ? '✅' : '📋'}
          </button>
        </div>
      </div>

      <div
        className={styles.outputContent}
        aria-live="polite"
        role="region"
        aria-label="Translation output"
      >
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.dots}>
              <span /><span /><span />
            </div>
            {progress > 0 && progress < 100 && (
              <div className={styles.progressWrap}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <span className={styles.progressLabel}>{progress}%</span>
              </div>
            )}
            <p className={styles.loadingText}>
              Translating{progress > 0 ? ` (${progress}%)` : '…'}
            </p>
          </div>
        ) : value ? (
          <p className={styles.outputText}>{value}</p>
        ) : (
          <p className={styles.placeholder}>Translation will appear here…</p>
        )}
      </div>
    </div>
  );
}
