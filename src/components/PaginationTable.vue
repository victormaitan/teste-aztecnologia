<template>
  <ul class="page">
    <li class="page__btn"><img src="../assets/icons/chevron-left.svg" class="icon" /></li>
    <div v-for="(page, index) in pagination?.total_pages" :key="index">
      <li
        :class="`page__numbers ${pagination.page === page ? 'active' : ''}`"
        @click="fetchCandidates({ page: index + 1 })"
      >
        {{ page }}
      </li>
    </div>
    <li class="page__btn"><img src="../assets/icons/chevron-right.svg" class="icon" /></li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CandidatesService from '../services/CandidatesService.js'
export default {
  data() {
    return {
      pagination: {
        page: 1,
        per_page: 6,
        total: 0,
        total_pages: 0
      }
    }
  },
  async mounted() {
    this.candidatesService = new CandidatesService()
    this.pagination = await this.getPagination
  },
  computed: {
    ...mapGetters(['getPagination'])
  },
  watch: {
    getPagination(value) {
      this.pagination = value
    }
  },
  methods: {
    ...mapActions(['setCandidates', 'setPagination']),
    async fetchCandidates(pagination) {
      this.$emit('isLoading', true)
      await this.candidatesService.FetchCandidates(pagination).then((payload) => {
        this.$emit('isLoading', false)
        this.setCandidates(payload.data.data)
        this.setPagination(payload.data)
        this.pagination = this.getPagination
      }).catch(() => {
        this.$emit('isLoading', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
}

.icon {
  width: 25px;
  height: 25px;
}

.items-list {
  max-width: 90vw;
  margin: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 3rem;
  justify-content: center;
  align-content: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.item {
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ff8000;
  cursor: pointer;

  span {
    background: #ffffff;
    box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);
    border-radius: 0.6rem;
    padding: 2rem;
    font-size: 3rem;
    transition: all 0.3s ease;
  }

  &:hover {
    span {
      transform: scale(1.2);
      color: #ff8000;
    }
  }

  p {
    font-size: 1.2rem;
    margin-top: 1rem;
    color: #ff8000;
  }
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  margin: 3rem;
  border-radius: 0.6rem;
  background: #252525;
  box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);

  &__numbers,
  &__btn,
  &__dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.8rem;
    font-size: 1.4rem;
    cursor: pointer;
  }

  &__numbers {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 0.4rem;

    &:hover {
      color: #ff8000;
    }

    &.active {
      color: #ffffff;
      background: #ff8000;
      font-weight: 600;
      border: 1px solid #ff8000;
    }
  }

  &__btn {
    color: #ff8000;
    pointer-events: none;

    &.active {
      color: #ff8000;
      pointer-events: initial;

      &:hover {
        color: #ff8000;
      }
    }
  }
}
</style>
