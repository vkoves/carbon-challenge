<template>
  <main id="main-content" class="page">
    <div class="page-inner">
      <h1>{{ $t('about.title') }}</h1>

      <!-- TODO: Move into language constants for i18n -->
      <p>
        The Carbon Challenge is a project made by
        <a href="https://viktorkoves.com/">Viktor Köves</a> with help from lots
        of wonderful folks in coding, translation, and art.
      </p>

      <p>
        The Carbon Challenge is an open-source project, so if you want to help make the Carbon Challenge better, or just see how it works,
        <a href="https://github.com/vkoves/carbon-challenge">check it out on GitHub</a>!
      </p>

      <h2>Disclaimers</h2>

      <p>
        The Carbon Challenge is a project made by non-scientists, and although
        we did a lot of research it is a layer of estimates on estimates and is
        thus not a truly accurate <em>simulation</em> of climate change or
        emissions.
      </p>

      <p>
        To put that into context, here are a few <em>incorrect</em> assumptions
        our model makes:
      </p>

      <ul class="bulleted">
        <li>
          <strong>Without policy, emissions remain constant</strong> - this
          isn't true in both emission growth and reduction. Even in the abscence
          of any policy, climate change awareness and economic factors will
          likely reduce some types of emissions. However, as economies grow and
          develop, some regions may see increased emissions in the short-term.
          Our model doesn't account for any of that.
        </li>
        <li>
          <strong>Policies are made and enacted globally</strong> - although
          some global organizations like the United Nations might make policy
          recommendations, most policy decisions are made locally and vary region
          by region, meaning emissions likewise vary region by region!
        </li>
        <li>
          <strong>Policies are perfectly enforced</strong> - no policy is
          perfect or perfectly enforced, and this includes climate change
          policy. Our models assume that a ban on gas cars would mean there are
          zero gas vehicles left on the road at all, but that's extremely
          unlikely in the real world.
        </li>
      </ul>

      <p>
        With all that in mind, <strong>the Carbon Challenge should not be used
        in place of accurate climate models</strong>. It's intended as a
        starting point for non-scientists to think about
        <em>order of magnitude</em> differences between different policies. That
        means that we want to be accurate in saying one policy is
        <em>several times</em> more effective than another, but we likely aren't
        going to be as accurate in comparing two policies that have similar size
        impacts.
      </p>

      <p>
        However, if you see something really wrong in our calculations, please
        help the Carbon Challenge improve by filing an issue on the
        <a href="https://github.com/vkoves/carbon-challenge">
          Carbon Challenge GitHub
        </a>!
      </p>

      <h2>References</h2>

      <dl>
          <dt>
            <strong>Carbon Budgets</strong> - Used to determine an estimate for
            how much warming corresponds to a single Gigatonne of emitted
            CO<sub>2</sub>.
          </dt>
          <dd>
            <a href="https://carbontracker.org/carbon-budgets-where-are-we-now/">
              Carbon Budgets: Where Are We Now? | Carbon Tracker
            </a>
          </dd>

          <dt>
            <strong>Carbon Emissions by Sector</strong> - Used to figure out
            what changes will reduce emissions by what amount.
          </dt>
          <dd>
            <a href="https://ourworldindata.org/ghg-emissions-by-sector">
              Sector by sector: where do global greenhouse gas emissions come from? | Our World in Data
            </a>
          </dd>

          <dt>
            <strong>Climate Change Frequently Asked Questions</strong> - For the
            overlay explaining the impacts of warming.
          </dt>
          <dd>
            <a href="https://climate.nasa.gov/faq/">
              Frequently Asked Questions | NASA - Global Climate Change
            </a>
          </dd>
      </dl>

    </div>
  </main>
</template>

<style scoped lang="scss">
dt, dd { display: block; }

dt { margin-top: 1rem; }

dd { margin-left: 1rem; }
</style>
