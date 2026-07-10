import { useState, useRef, useCallback, useEffect } from 'react';
import Background from './components/Background';
import LanguageBar from './components/LanguageBar';
import { SourcePanel, OutputPanel } from './components/TranslatorPanels';
import Toast from './components/Toast';
import { translateText, QUICK_PHRASES, LANG_MAP } from './utils/translate';
import styles from './App.module.css';

export default function App() {
  const [sourceText, setSourceText]   = useState('');
  const [translated, setTranslated]   = useState('');
  const [sourceLang, setSourceLang]   = useState('auto');
  const [targetLang, setTargetLang]   = useState('ur');
  const [isLoading, setIsLoading]     = useState(false);
  const [progress, setProgress]       = useState(0);
  const [detectedLang, setDetectedLang] = useState('');
  const [status, setStatus]           = useState({ msg: '', type: '' });
  const [toast, setToast]             = useState({ msg: '', type: 'info', visible: false });
  const [copied, setCopied]           = useState(false);

  const autoTimer  = useRef(null);
  const abortCtrl  = useRef(null);

  /* ---- Toast helper ---- */
  const showToast = useCallback((msg, type = 'info') => {
    setToast({ msg, type, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3200);
  }, []);

  /* ---- Core translate ---- */
  const doTranslate = useCallback(async (text, src, tgt) => {
    if (!text.trim()) return;
    if (isLoading) return;

    setIsLoading(true);
    setProgress(0);
    setStatus({ msg: '', type: '' });

    try {
      const result = await translateText(text, src, tgt, (pct) => setProgress(pct));
      setTranslated(result);
      const wordCount = text.trim().split(/\s+/).length;
      setStatus({ msg: `✓ Translated ${wordCount.toLocaleString()} word${wordCount !== 1 ? 's' : ''}`, type: 'success' });
    } catch (err) {
      const msg = err.message?.includes('Failed to fetch')
        ? 'Network error — check your connection.'
        : err.message || 'Translation failed.';
      setTranslated('');
      setStatus({ msg, type: 'error' });
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  }, [isLoading, showToast]);

  /* ---- Auto-translate on text change ---- */
  useEffect(() => {
    clearTimeout(autoTimer.current);
    if (!sourceText.trim()) {
      setTranslated('');
      setStatus({ msg: '', type: '' });
      setDetectedLang('');
      return;
    }
    autoTimer.current = setTimeout(() => {
      doTranslate(sourceText, sourceLang, targetLang);
    }, 800);
    return () => clearTimeout(autoTimer.current);
  }, [sourceText, sourceLang, targetLang]);

  /* ---- Swap languages ---- */
  function handleSwap() {
    if (sourceLang === 'auto') {
      showToast('Select a specific source language before swapping.', 'info');
      return;
    }
    const prevSrc = sourceLang;
    const prevTgt = targetLang;
    setSourceLang(prevTgt);
    setTargetLang(prevSrc);
    if (translated) setSourceText(translated);
  }

  /* ---- Copy translated text ---- */
  async function handleCopy() {
    if (!translated) { showToast('Nothing to copy yet!', 'info'); return; }
    try {
      await navigator.clipboard.writeText(translated);
      setCopied(true);
      showToast('Copied to clipboard!', 'copy');
      setTimeout(() => setCopied(false), 2200);
    } catch {
      showToast('Copy failed — please select text manually.', 'error');
    }
  }

  /* ---- Quick phrase click ---- */
  const cardRef = useRef(null);

  function handleQuickPhrase(phrase) {
    setSourceText(phrase);
    // Scroll to top so user sees the translation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Trigger translate immediately
    clearTimeout(autoTimer.current);
    doTranslate(phrase, sourceLang, targetLang);
  }

  /* ---- Manual translate button ---- */
  function handleTranslateBtn() {
    clearTimeout(autoTimer.current);
    doTranslate(sourceText, sourceLang, targetLang);
  }

  return (
    <>
      <Background />
      <Toast message={toast.msg} type={toast.type} visible={toast.visible} />

      <div className={styles.wrapper}>

        {/* ── Header ── */}
        <header className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Breaking Language Barriers · Translate Anything, Anywhere
          </div>

          <div className={styles.logoRow}>
            <div className={styles.logoIcon} aria-hidden="true">🌐</div>
            <h1 className={styles.title}>LinguaFlow</h1>
          </div>

          <p className={styles.subtitle}>
            Break language barriers instantly. Translate <strong>unlimited text</strong> across 70+ languages — no API key, no limits.
          </p>
        </header>

        {/* ── Main Card ── */}
        <main className={styles.card} role="main">

          {/* Language bar */}
          <LanguageBar
            sourceLang={sourceLang}
            targetLang={targetLang}
            onSourceChange={setSourceLang}
            onTargetChange={setTargetLang}
            onSwap={handleSwap}
          />

          {/* Panels */}
          <div className={styles.panels}>
            <SourcePanel
              value={sourceText}
              onChange={setSourceText}
              onClear={() => { setSourceText(''); setTranslated(''); setDetectedLang(''); }}
              langCode={sourceLang}
              detectedLang={detectedLang}
            />
            <OutputPanel
              value={translated}
              isLoading={isLoading}
              progress={progress}
              onCopy={handleCopy}
              targetLangCode={targetLang}
              copied={copied}
            />
          </div>

          {/* Action bar */}
          <div className={styles.actionBar}>
            <div className={`${styles.statusMsg} ${status.type === 'error' ? styles.statusError : status.type === 'success' ? styles.statusSuccess : ''}`}>
              {status.msg}
            </div>

            <button
              className={`${styles.translateBtn} ${isLoading ? styles.translateBtnLoading : ''}`}
              onClick={handleTranslateBtn}
              disabled={isLoading || !sourceText.trim()}
              aria-label="Translate text"
              title="Translate (Ctrl + Enter)"
            >
              <span className={styles.btnIcon}>{isLoading ? '⟳' : '→'}</span>
              <span>{isLoading ? 'Translating…' : 'Translate'}</span>
            </button>
          </div>
        </main>

        {/* ── Quick Phrases ── */}
        <section className={styles.quickSection} aria-label="Quick phrases">
          <p className={styles.quickTitle}>
            <span>Quick Phrases</span>
          </p>
          <div className={styles.chips}>
            {QUICK_PHRASES.map(phrase => (
              <button
                key={phrase}
                className={styles.chip}
                onClick={() => handleQuickPhrase(phrase)}
              >
                {phrase}
              </button>
            ))}
          </div>
        </section>

        {/* ── Feature Buttons ── */}
        <div className={styles.statsStrip}>

          {/* 1 — Scroll to top / Languages */}
          <button
            className={styles.statCard}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Go to language selector"
          >
            <span className={styles.statIcon}>🌍</span>
            <div>
              <strong>70+ Languages</strong>
              <p>Click to go to selector</p>
            </div>
          </button>

          {/* 2 — Copy translation */}
          <button
            className={styles.statCard}
            onClick={handleCopy}
            title="Copy the translation"
          >
            <span className={styles.statIcon}>📋</span>
            <div>
              <strong>Copy Translation</strong>
              <p>Click to copy result</p>
            </div>
          </button>

          {/* 3 — Speak translated text */}
          <button
            className={styles.statCard}
            onClick={() => {
              if (!translated.trim()) { showToast('Pehle kuch translate karo!', 'info'); return; }
              if (!('speechSynthesis' in window)) { showToast('Browser TTS support nahi karta', 'error'); return; }
              if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); return; }
              const utt = new SpeechSynthesisUtterance(translated);
              utt.lang = targetLang;
              utt.rate = 0.85;
              window.speechSynthesis.cancel();
              setTimeout(() => window.speechSynthesis.speak(utt), 100);
              showToast('🔊 Speaking translation…', 'info');
            }}
            title="Speak the translation aloud"
          >
            <span className={styles.statIcon}>🎙️</span>
            <div>
              <strong>Text-to-Speech</strong>
              <p>Click to hear translation</p>
            </div>
          </button>

          {/* 4 — Clear everything */}
          <button
            className={styles.statCard}
            onClick={() => {
              setSourceText('');
              setTranslated('');
              setDetectedLang('');
              setStatus({ msg: '', type: '' });
              window.speechSynthesis?.cancel();
              showToast('🗑️ Cleared!', 'info');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Clear everything and start fresh"
          >
            <span className={styles.statIcon}>🔄</span>
            <div>
              <strong>Clear &amp; Reset</strong>
              <p>Click to start fresh</p>
            </div>
          </button>

        </div>

        <footer className={styles.footer}>
          <p>Built with ❤️ by LinguaFlow · Speak Every Language © 2026</p>
        </footer>
      </div>
    </>
  );
}
