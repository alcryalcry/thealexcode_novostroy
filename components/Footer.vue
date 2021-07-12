<template>
  <footer class="footer">
    <Section is-black>
      <Container>
        <div class="grid">
          <div class="grid-col-title">
            <WrapperTitle :title="$locale.footer.sendRequest" :body="$locale.footer.responseDelayDescription" />
          </div>
          <div class="grid-col-body">
            <AppForm />
          </div>
          <div class="grid-col-title grid-col-info">
            <div class="footer-info">
              <div class="footer-info-col">
                <div class="footer-info-title text--h3">
                  {{ $locale.footer.contacts }}
                </div>
                <div class="footer-info-body text--h3 gray">
                  <vue-markdown
                    v-for="item in getSettings.contactList"
                    :key="item.id"
                    :source="item.text"
                  />
                </div>
              </div>
              <div class="footer-info-col">
                <div class="footer-info-title text--h3">
                  {{ $locale.footer.adress }}
                </div>
                <div class="footer-info-body text--h3 gray">
                  <vue-markdown
                    v-for="item in getSettings.addressList"
                    :key="item.id"
                    :source="item.text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="grid-col-bottom">
            <div class="footer-copyright gray text--t3">
              {{ getSettings.copyright }}
            </div>
            <div class="footer-madeby">
              <span class="gray text--t3">{{ $locale.footer.madeByLabel }}</span>
              <Link is-white :label="$locale.footer.madeByCompany" :url="$locale.footer.madeByUrl" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  </footer>
</template>

<script>
import WrapperTitle from '@/components/WrapperTitle'
import AppForm from '@/components/Form'
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  components: {
    AppForm,
    WrapperTitle
  },
  computed: {
    ...mapGetters({
      getSettings: 'getSettings'
    })
  }
}
</script>

<style lang="scss" scoped>
$colGapDesktop: $COL_GAP_DESKTOP;
$colorDarkGray: var(--color-dark-gray);
$offsetGapMobile: 4rem;
$offsetGapTablet: 8rem;
$offsetGap: 10rem;

.footer-info {
  display: grid;
  grid-row-gap: 2rem;
}

.gray {
  color: $colorDarkGray;
}

.grid-col-bottom {
  display: flex;
  justify-content: space-between;
}

.footer-info-body {
  > * {
    margin-top: 2rem;
  }
}

@include mobile {
  .grid {
    grid-row-gap: $offsetGapMobile;
  }
  .grid-col-bottom {
    flex-flow: column nowrap;
  }
  .footer-madeby {
    margin-top: $offsetGapMobile;
  }
}

@include tablet {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: $offsetGapTablet;
  }
  .grid-col-title {
    grid-column: 1 / span 1;
  }
  .grid-col-info {
    grid-column: 1 / span 2;
  }
  .grid-col-body {
    grid-column: 2 / span 1;
  }
  .grid-col-bottom {
    grid-column: 1 / span 2;
  }
}

@include desktop {
  .grid {
    grid-row-gap: $offsetGap;
    grid-template-columns: repeat(12, 1fr);
  }
  .footer-info {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: $colGapDesktop;
  }
  .grid-col-body {
    grid-column: 7 / span 6;
  }
  .grid-col-bottom {
    grid-column: 7 / span 6;
    grid-row: 3;
    grid-template-columns: repeat(2, 1fr) 8fr;
  }
}
</style>
