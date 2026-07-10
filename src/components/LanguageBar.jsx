import styles from './LanguageBar.module.css';
import { LANGUAGES } from '../utils/translate';

export default function LanguageBar({ sourceLang, targetLang, onSourceChange, onTargetChange, onSwap }) {
  const targetLangs = LANGUAGES.filter(l => l.code !== 'auto');

  return (
    <div className={styles.bar}>
      {/* Source */}
      <div className={styles.selectorGroup}>
        <label className={styles.label} htmlFor="sourceLang">From</label>
        <div className={styles.selectWrap}>
          <select
            id="sourceLang"
            className={styles.select}
            value={sourceLang}
            onChange={e => onSourceChange(e.target.value)}
            aria-label="Source language"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
          <span className={styles.arrow}>▾</span>
        </div>
      </div>

      {/* Swap Button */}
      <button
        className={styles.swapBtn}
        onClick={onSwap}
        title="Swap languages"
        aria-label="Swap languages"
      >
        <span className={styles.swapIcon}>⇄</span>
      </button>

      {/* Target */}
      <div className={styles.selectorGroup}>
        <label className={styles.label} htmlFor="targetLang">To</label>
        <div className={styles.selectWrap}>
          <select
            id="targetLang"
            className={styles.select}
            value={targetLang}
            onChange={e => onTargetChange(e.target.value)}
            aria-label="Target language"
          >
            {targetLangs.map(l => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
          <span className={styles.arrow}>▾</span>
        </div>
      </div>
    </div>
  );
}
