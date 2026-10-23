import Seo from '../components/Seo';
import FeedbackForm from '../components/FeedbackForm';
import { CtaBanner, PageHero, ReviewsBlock, SectionHead } from '../components/blocks';
import { reviews } from '../data/reviews';

export default function Reviews() {
  return (
    <div className="page">
      <Seo path="/reviews" />
      <PageHero
        eyebrow="Client feedback"
        title={reviews.length ? 'Kind words from people we’ve built for.' : 'What working with us looks like.'}
        lead="We let our clients do the talking — and we only ever publish genuine feedback shared with permission."
      />
      <section className="section--tight">
        <div className="container"><ReviewsBlock /></div>
      </section>

      <section className="section" id="share">
        <div className="container split split--sticky">
          <div>
            <span className="eyebrow">Worked with us?</span>
            <h2>Share your feedback</h2>
            <p className="lead">Honest feedback helps us improve and helps future clients know what to expect. It goes straight to our founder’s inbox.</p>
          </div>
          <FeedbackForm />
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <SectionHead eyebrow="Next" title="Ready to be our next success story?" />
        </div>
      </section>
      <CtaBanner />
    </div>
  );
}
