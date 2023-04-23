<template>
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">ID</div>
      <div class="col col-2">Nome</div>
      <div class="col col-3">Email</div>
      <div class="col col-4">Foto</div>
      <div class="col col-5">Ações</div>
    </li>
    <li class="table-row" v-for="(candidate, index) in getCandidates" :key="index">
      <div class="col col-1" data-label="Identif." style="margin-left: 15px">
        {{ candidate.id }}
      </div>
      <div class="col col-2" data-label="Nome">
        {{ `${candidate.first_name} ${candidate.last_name}` }}
      </div>
      <div class="col col-3" data-label="Email">{{ candidate.email }}</div>
      <div class="col col-4" data-label="Foto">
        <img class="avatar" :src="candidate.avatar" alt="Avatar do candidato" />
      </div>
      <div class="col col-5" data-label="Ações">
        <div class="actions">
          <button class="btn-actions" @click.prevent="updateCandidate(candidate)">
            <img src="../assets/icons/edit.svg" class="icon" />
          </button>
          <button class="btn-actions" @click.prevent="deleteCandidate(candidate.id)">
            <img src="../assets/icons/delete.svg" class="icon" />
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CandidatesService from '../services/CandidatesService.js'
import { notifyConfirm } from '../utils/functions.js'
export default {
  data() {
    return {}
  },
  async mounted() {
    this.candidatesService = new CandidatesService()
    this.fetchCandidates({ page: 1 })
  },
  computed: {
    ...mapGetters(['getCandidates'])
  },
  methods: {
    ...mapActions(['setCandidates', 'setPagination', 'editCandidate', 'setDeleteCandidate']),
    fetchCandidates(payload) {
      this.$emit('isLoading', true)
      this.candidatesService
        .FetchCandidates(payload)
        .then((payload) => {
          this.$emit('isLoading', false)
          this.setCandidates(payload.data.data)
          this.setPagination(payload.data)
        })
        .catch(() => {
          this.$emit('isLoading', false)
        })
    },
    updateCandidate(payload) {
      this.editCandidate(payload)
      this.$router.push({ name: 'edit-candidate' })
    },
    deleteCandidate(id) {
      this.setDeleteCandidate(id)
      notifyConfirm()
    }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  flex-direction: row;
}
.icon {
  margin: 2px;
  width: 25px;
  height: 25px;
}

.avatar {
  width: 60px;
  margin: 0px;
  border-radius: 15px;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.144);
}

.responsive-table {
  padding-left: 0px;

  li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  .table-header {
    background-color: #ff8000;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: #ffeddb;
    align-items: center;
    color: black;
    padding: 10px;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }
  .col-1 {
    flex-basis: 5%;
  }
  .col-2 {
    flex-basis: 20%;
  }
  .col-3 {
    flex-basis: 10%;
  }
  .col-4 {
    flex-basis: 5%;
  }
  .col-5 {
    flex-basis: 5%;
  }

  @media (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row {
    }
    li {
      display: block;
    }
    .col {
      flex-basis: 100%;
    }
    .col {
      display: flex;
      padding: 5px 0;
      &:before {
        color: #ff8000;
        padding-right: 15px;
        content: attr(data-label);
        flex-basis: 40%;
        text-align: right;
      }
    }
  }
}
</style>
