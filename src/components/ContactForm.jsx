import { useEffect, useRef, useState } from 'react';

export function ContactForm() {
  const [state, setState] = useState('idle');
  const timer = useRef(null);
  const submitted = useRef(false);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  function submit() {
    submitted.current = true;
    setState('sending');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      submitted.current = false;
      setState('timeout');
    }, 20000);
  }

  function responseLoaded() {
    if (!submitted.current) return;
    submitted.current = false;
    window.clearTimeout(timer.current);
    // Cross-origin iframe responses cannot prove Google Forms accepted the submission.
    setState('responded');
  }

  return <>
    <form className="c-form" id="contact-form" action="https://docs.google.com/forms/d/e/1FAIpQLSdjCXfZbz62TNXXf_cgJSjrhryntMB-0T3Iu9_AHs3obZlBdg/formResponse" method="post" target="contact-response" onSubmit={submit}>
      <div className="c-form__item"><label className="c-form__label" htmlFor="field-name">お名前</label><input name="entry.1706845888" className="c-form__input" id="field-name" placeholder="お名前" type="text" autoComplete="name" required /></div>
      <div className="c-form__item"><label className="c-form__label" htmlFor="field-mail">メールアドレス</label><input name="entry.127583046" className="c-form__input" id="field-mail" placeholder="name@example.com" type="email" inputMode="email" autoComplete="email" required /></div>
      <div className="c-form__item"><label className="c-form__label" htmlFor="field-message">メッセージ内容</label><textarea name="entry.1469060305" className="c-form__input" id="field-message" placeholder="お問い合わせ内容" /></div>
      <div className="c-form__submit"><button type="submit" disabled={state === 'sending' || state === 'responded'}>送信する</button></div>
      <p className="form-status" role="status" aria-live="polite">{state === 'sending' ? '送信しています…' : state === 'responded' ? '送信先から応答がありました。受付結果はこの画面では確認できません。返信が届かない場合はメールでお問い合わせください。' : state === 'timeout' ? '送信結果を確認できませんでした。重複送信にご注意のうえ、時間をおいて再度お試しいただくか、メールでお問い合わせください。' : ''}</p>
      {state === 'responded' || state === 'timeout' ? <p className="form-status"><a href="mailto:kigyo.toshi@gmail.com">kigyo.toshi@gmail.com</a></p> : null}
    </form>
    <iframe name="contact-response" title="お問い合わせ送信用の非表示フレーム" hidden onLoad={responseLoaded} />
  </>;
}
