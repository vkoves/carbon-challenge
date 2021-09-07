<template>
  <main id="main-content" class="page">
    <div class="page-inner">
      <h1>{{ $t('faq.title') }}</h1>

      <!-- TODO: Move into language constants for i18n -->
      <h2>Do scientists agree on climate change?</h2>

      <figure class="quote-block">
        <blockquote>
          <p>Yes, the vast majority of actively publishing climate
          scientists – 97 percent – agree that humans are causing global warming
          and climate change.</p>
        </blockquote>
        <figcaption class="quote-cite">— NASA Global Climate Change</figcaption>
      </figure>

      <h2>What is the greenhouse effect?</h2>

      <figure class="quote-block">
        <blockquote>
          <p>The greenhouse effect is the way in which heat is trapped
            close to Earth's surface by “greenhouse gases.” These heat-trapping
            gases can be thought of as a blanket wrapped around Earth, keeping the
            planet toastier than it would be without them. Greenhouse gases include
            carbon dioxide, methane, and nitrous oxides&hellip;</p>

            <p>Greenhouse gases occur naturally and are part of our atmosphere's
            makeup&hellip; but in the last century or so, humans have been
            interfering with the planet's energy balance, mainly through the
            burning of fossil fuels that add carbon dioxide to the air. The
            level of carbon dioxide in Earth’s atmosphere has been rising
            consistently for decades and traps extra heat near Earth's surface,
              causing temperatures to rise.</p>
        </blockquote>
        <figcaption class="quote-cite">— NASA Global Climate Change</figcaption>
      </figure>

      <h2>Is it too late to stop climate change?</h2>

      <figure class="quote-block">
        <blockquote>
          <p>Humans have caused major climate changes to happen
          already, and we have set in motion more changes still. However, if
          we stopped emitting greenhouse gases today, the rise in global
          temperatures would begin to flatten within a few years.
          Temperatures would then plateau but remain well-elevated for many,
          many centuries.</p>
        </blockquote>
        <figcaption class="quote-cite">— NASA Global Climate Change</figcaption>
      </figure>

      <p>
        Learn more from
        <a href="https://climate.nasa.gov/faq/">NASA's Global Climate Change page</a>.
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import './styles/variables/spacing';

h2 {
  font-size: 1.25rem;
  margin-top: $large;
}
</style>
