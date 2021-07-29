<template>
  <footer id="form" class="footer">
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
            <ContactsInfo />
          </div>
          <div class="grid-col-bottom">
            <div class="footer-copyright gray text--t3">
              {{ getSettings.copyright }}
            </div>
            <div class="footer-madeby">
              <span class="gray text--t3">{{ $locale.footer.madeByLabel }}</span>
              <Link is-external is-white :label="$locale.footer.madeByCompany" :url="$locale.footer.madeByUrl" />
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
import ContactsInfo from '@/components/ContactsInfo'
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  components: {
    AppForm,
    WrapperTitle,
    ContactsInfo
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

.gray {
  color: $colorDarkGray;
}

.grid-col-bottom {
  display: flex;
  justify-content: space-between;
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
  .grid-col-body {
    grid-column: 7 / span 6;
  }
  .grid-col-bottom {
    grid-column: 7 / span 6;
    grid-row: 3;
    grid-template-columns: repeat(2, 1fr) 8fr;
    min-height: 8rem;
  }

  .footer-copyright {
    display: flex;
    align-items: flex-end;
  }
  .footer-madeby {
    display: flex;
    align-items: flex-end;
    .link {
      margin-left: .5rem;
    }
  }
}
</style>
