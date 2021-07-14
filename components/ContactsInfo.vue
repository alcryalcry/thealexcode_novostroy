<template>
  <div class="contacts-info">
    <div class="contacts-info-col">
      <div class="contacts-info-title text--h3">
        {{ $locale.footer.contacts }}
      </div>
      <div class="contacts-info-body text--h3 gray">
        <vue-markdown
          v-for="item in getSettings.contactList"
          :key="item.id"
          :source="item.text"
        />
      </div>
    </div>
    <div class="contacts-info-col">
      <div class="contacts-info-title text--h3">
        {{ $locale.footer.adress }}
      </div>
      <div class="contacts-info-body text--h3 gray">
        <vue-markdown
          v-for="item in getSettings.addressList"
          :key="item.id"
          :source="item.text"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContactsInfo',
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

.gray {
  color: $colorDarkGray;
}

.contacts-info {
  display: grid;
  grid-row-gap: 2rem;
}

.contacts-info-body {
  > * {
    margin-top: 2rem;
  }
}

@include desktop {
  .contacts-info {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: $colGapDesktop;
  }
}
</style>
