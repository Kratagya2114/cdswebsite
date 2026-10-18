import Seo from '../components/Seo';
import { PageHero } from '../components/blocks';
import { site } from '../data/site';

export default function Privacy() {
  return (
    <div className="page">
      <Seo path="/privacy" />
      <PageHero eyebrow="Legal" title="Privacy Policy" lead="A plain-language summary of how this website handles information." />
      <section className="section--tight">
        <div className="container prose">
          <p className="note">This is a general template. Have it reviewed against your actual practices and local laws before relying on it.</p>
          <h2>What we collect</h2>
          <p>When you send a project inquiry or feedback, we receive the details you enter: your name, email, optional company, project information and message. If you use the chat assistant, your messages are sent to our server and to Google’s Gemini service to generate replies.</p>
          <h2>How we use it</h2>
          <ul>
            <li>To reply to your inquiry and discuss your project.</li>
            <li>To improve our services and, with your consent, display feedback you choose to share.</li>
            <li>To protect the site from spam and abuse.</li>
          </ul>
          <h2>Sharing</h2>
          <p>We do not sell your information. Messages are handled by email and hosting providers and, for chat, by Google’s AI service, only as needed to run the website.</p>
          <h2>Retention</h2>
          <p>We keep inquiry emails for as long as needed to respond and for reasonable business records. You can ask us to delete your information at any time.</p>
          <h2>Your choices</h2>
          <p>To access, correct or delete your information, email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          <h2>Changes</h2>
          <p>We may update this policy as the site evolves. The latest version is always on this page.</p>
        </div>
      </section>
    </div>
  );
}
