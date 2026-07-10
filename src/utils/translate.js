// All supported languages
export const LANGUAGES = [
  { code: 'auto', name: '🔍 Detect Language', flag: '🔍' },
  { code: 'en',   name: '🇬🇧 English',              flag: '🇬🇧' },
  { code: 'ur',   name: '🇵🇰 Urdu',                 flag: '🇵🇰' },
  { code: 'ar',   name: '🇸🇦 Arabic',               flag: '🇸🇦' },
  { code: 'hi',   name: '🇮🇳 Hindi',                flag: '🇮🇳' },
  { code: 'es',   name: '🇪🇸 Spanish',              flag: '🇪🇸' },
  { code: 'fr',   name: '🇫🇷 French',               flag: '🇫🇷' },
  { code: 'de',   name: '🇩🇪 German',               flag: '🇩🇪' },
  { code: 'it',   name: '🇮🇹 Italian',              flag: '🇮🇹' },
  { code: 'pt',   name: '🇵🇹 Portuguese',           flag: '🇵🇹' },
  { code: 'ru',   name: '🇷🇺 Russian',              flag: '🇷🇺' },
  { code: 'zh',   name: '🇨🇳 Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'zh-TW',name: '🇹🇼 Chinese (Traditional)',flag: '🇹🇼' },
  { code: 'ja',   name: '🇯🇵 Japanese',             flag: '🇯🇵' },
  { code: 'ko',   name: '🇰🇷 Korean',               flag: '🇰🇷' },
  { code: 'tr',   name: '🇹🇷 Turkish',              flag: '🇹🇷' },
  { code: 'nl',   name: '🇳🇱 Dutch',                flag: '🇳🇱' },
  { code: 'pl',   name: '🇵🇱 Polish',               flag: '🇵🇱' },
  { code: 'sv',   name: '🇸🇪 Swedish',              flag: '🇸🇪' },
  { code: 'da',   name: '🇩🇰 Danish',               flag: '🇩🇰' },
  { code: 'fi',   name: '🇫🇮 Finnish',              flag: '🇫🇮' },
  { code: 'no',   name: '🇳🇴 Norwegian',            flag: '🇳🇴' },
  { code: 'el',   name: '🇬🇷 Greek',                flag: '🇬🇷' },
  { code: 'cs',   name: '🇨🇿 Czech',                flag: '🇨🇿' },
  { code: 'hu',   name: '🇭🇺 Hungarian',            flag: '🇭🇺' },
  { code: 'ro',   name: '🇷🇴 Romanian',             flag: '🇷🇴' },
  { code: 'bg',   name: '🇧🇬 Bulgarian',            flag: '🇧🇬' },
  { code: 'uk',   name: '🇺🇦 Ukrainian',            flag: '🇺🇦' },
  { code: 'he',   name: '🇮🇱 Hebrew',               flag: '🇮🇱' },
  { code: 'fa',   name: '🇮🇷 Persian',              flag: '🇮🇷' },
  { code: 'th',   name: '🇹🇭 Thai',                 flag: '🇹🇭' },
  { code: 'vi',   name: '🇻🇳 Vietnamese',           flag: '🇻🇳' },
  { code: 'id',   name: '🇮🇩 Indonesian',           flag: '🇮🇩' },
  { code: 'ms',   name: '🇲🇾 Malay',                flag: '🇲🇾' },
  { code: 'tl',   name: '🇵🇭 Filipino',             flag: '🇵🇭' },
  { code: 'sw',   name: '🇰🇪 Swahili',              flag: '🇰🇪' },
  { code: 'bn',   name: '🇧🇩 Bengali',              flag: '🇧🇩' },
  { code: 'ta',   name: '🇮🇳 Tamil',                flag: '🇮🇳' },
  { code: 'te',   name: '🇮🇳 Telugu',               flag: '🇮🇳' },
  { code: 'ka',   name: '🇬🇪 Georgian',             flag: '🇬🇪' },
  { code: 'hy',   name: '🇦🇲 Armenian',             flag: '🇦🇲' },
  { code: 'az',   name: '🇦🇿 Azerbaijani',          flag: '🇦🇿' },
  { code: 'la',   name: '🏛️ Latin',                 flag: '🏛️' },
  { code: 'cy',   name: '🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh',             flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
  { code: 'ga',   name: '🇮🇪 Irish',                flag: '🇮🇪' },
  { code: 'af',   name: '🇿🇦 Afrikaans',            flag: '🇿🇦' },
  { code: 'is',   name: '🇮🇸 Icelandic',            flag: '🇮🇸' },
  { code: 'sq',   name: '🇦🇱 Albanian',             flag: '🇦🇱' },
  { code: 'sr',   name: '🇷🇸 Serbian',              flag: '🇷🇸' },
  { code: 'sk',   name: '🇸🇰 Slovak',               flag: '🇸🇰' },
  { code: 'sl',   name: '🇸🇮 Slovenian',            flag: '🇸🇮' },
  { code: 'lv',   name: '🇱🇻 Latvian',              flag: '🇱🇻' },
  { code: 'lt',   name: '🇱🇹 Lithuanian',           flag: '🇱🇹' },
  { code: 'et',   name: '🇪🇪 Estonian',             flag: '🇪🇪' },
  { code: 'mt',   name: '🇲🇹 Maltese',              flag: '🇲🇹' },
  { code: 'ne',   name: '🇳🇵 Nepali',               flag: '🇳🇵' },
  { code: 'mn',   name: '🇲🇳 Mongolian',            flag: '🇲🇳' },
  { code: 'my',   name: '🇲🇲 Burmese',              flag: '🇲🇲' },
];

export const LANG_MAP = Object.fromEntries(LANGUAGES.map(l => [l.code, l.name]));

// BCP-47 map for TTS
export const BCP47 = {
  zh: 'zh-CN', 'zh-TW': 'zh-TW', ar: 'ar-SA', hi: 'hi-IN',
  ur: 'ur-PK', ja: 'ja-JP', ko: 'ko-KR', ru: 'ru-RU',
  de: 'de-DE', fr: 'fr-FR', es: 'es-ES', pt: 'pt-PT',
  it: 'it-IT', nl: 'nl-NL', pl: 'pl-PL', sv: 'sv-SE',
  tr: 'tr-TR', en: 'en-US', vi: 'vi-VN', th: 'th-TH',
  id: 'id-ID', ms: 'ms-MY', el: 'el-GR', cs: 'cs-CZ',
  hu: 'hu-HU', ro: 'ro-RO', uk: 'uk-UA', he: 'he-IL',
  fa: 'fa-IR', fi: 'fi-FI', da: 'da-DK', no: 'no-NO',
  bn: 'bn-BD', ta: 'ta-IN', te: 'te-IN', ka: 'ka-GE',
};

export const QUICK_PHRASES = [
  'Hello, how are you?',
  'Thank you very much!',
  'Where is the nearest hospital?',
  'I love learning new languages.',
  'Good morning! Have a wonderful day.',
  'Can you help me please?',
  'What time does the train leave?',
  'The weather is beautiful today.',
];

/**
 * Split text into ≤490 char chunks at word/sentence boundaries
 * so we can bypass MyMemory's 500-char limit per request
 */
export function splitIntoChunks(text, maxLen = 490) {
  if (text.length <= maxLen) return [text];

  const chunks = [];
  // Try splitting at sentence boundaries first
  const sentences = text.match(/[^.!?\n]+[.!?\n]*/g) || [text];
  let current = '';

  for (const sentence of sentences) {
    if ((current + sentence).length > maxLen) {
      if (current.trim()) chunks.push(current.trim());
      // If a single sentence is too long, split at words
      if (sentence.length > maxLen) {
        const words = sentence.split(' ');
        let wordChunk = '';
        for (const word of words) {
          if ((wordChunk + ' ' + word).trim().length > maxLen) {
            if (wordChunk.trim()) chunks.push(wordChunk.trim());
            wordChunk = word;
          } else {
            wordChunk = (wordChunk + ' ' + word).trim();
          }
        }
        current = wordChunk;
      } else {
        current = sentence;
      }
    } else {
      current = (current + ' ' + sentence).trim();
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

/**
 * Translate a single chunk via MyMemory API
 */
async function translateChunk(text, srcLang, tgtLang) {
  const langPair = srcLang ? `${srcLang}|${tgtLang}` : `|${tgtLang}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langPair)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.responseStatus !== 200 && data.responseStatus !== '200') {
    throw new Error(data.responseDetails || 'Translation failed');
  }
  return {
    translated: data.responseData.translatedText,
    detectedLang: data.responseData.detectedLanguage || null,
  };
}

/**
 * Main translate function — handles unlimited text via chunking
 */
export async function translateText(text, srcLang, tgtLang, onProgress) {
  const effectiveSrc = srcLang === 'auto' ? '' : srcLang;
  const chunks = splitIntoChunks(text, 490);
  const results = [];

  for (let i = 0; i < chunks.length; i++) {
    const result = await translateChunk(chunks[i], effectiveSrc, tgtLang);
    results.push(result.translated);
    if (onProgress) onProgress(Math.round(((i + 1) / chunks.length) * 100));
    // Small delay between chunk requests to be nice to the API
    if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 150));
  }

  return results.join(' ');
}
