import { ContactForm } from '../components/ContactForm.jsx';

export default function Page() {
  return <main>
    <h1>お問い合わせ</h1>
    <p className="form-intro">お問い合わせはこちらからお願いします。</p>
    <ContactForm />
  </main>;
}
