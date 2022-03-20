<template>
  <div class="contacts-info">
    <div class="contacts-info-col">
      <div class="contacts-info-title text--h3">
        {{ $locale.footer.contacts }}
      </div>
      <div class="contacts-info-body text--h3 gray">
        <div
          v-for="item in getSettings.contactList"
          :key="item.id"
        >
          <vue-markdown :source="item.text" />
        </div>
      </div>
    </div>
    <div class="contacts-info-col">
      <div class="contacts-info-title text--h3">
        {{ $locale.footer.adress }}
      </div>
      <div class="contacts-info-body text--h3 gray">
        <div
          v-for="item in getSettings.addressList"
          :key="item.id"
          class="contacts-info-item"
        >
          <a :href="item.url" target="_blank" class="contacts-info-link">
            <vue-markdown
              :linkify="false"
              :source="item.text"
            />
          </a>
        </div>
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
$colorWhite: var(--color-white);
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

.contacts-info-link {
  transition: color .2s ease;
  &:active {
    color: $colorWhite;
  }
}

@include desktop {
  .contacts-info {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: $colGapDesktop;
  }
  .contacts-info-link {
    &:hover {
      color: $colorWhite;
    }
  }
}
</style>
