<template>
  <main id="main-content" class="page">
    <div class="page-inner">
      <h1>{{ $t('header.disclaimers') }}</h1>

      <!-- TODO: Move into language constants for i18n -->
      <p>
        The Carbon Challenge is a project made by non-scientists, and although
        we did a lot of research (learn more on our <a href="/about">About Page</a>)
        it is a layer of estimates on estimates and is thus not an accurate
        <em>simulation</em> of climate change or emissions.
      </p>

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
        With all that said, if you see something really wrong in our
        calculations, please help the Carbon Challenge improve by filing an
        issue on the
        <a href="https://github.com/vkoves/carbon-challenge">Carbon Challenge GitHub</a>!
      </p>
    </div>
  </main>
</template>
