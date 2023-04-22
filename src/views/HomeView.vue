<template>
  <div class="layout loginBackground">
    <img class="logo" src="../assets/logoFull.png" alt="Logo AZ Tecnologia" />
    <button class="btn-exit" @click.prevent="logout()">
      <img src="../assets/icons/exit.svg" class="icon" />
    </button>
  </div>
  <Loading class="layout" v-show="isLoading" style="margin-top: 40px; height: 85vh" />
  <div v-show="!isLoading" class="container">
    <div class="headerActions">
      <h2>Candidatos</h2>
      <button class="btn" @click.prevent="logout()">Novo Candidato</button>
    </div>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">ID</div>
        <div class="col col-2">Nome</div>
        <div class="col col-3">Email</div>
        <div class="col col-4">Foto</div>
        <div class="col col-5">Ações</div>
      </li>
      <li class="table-row" v-for="(candidate, index) in getCandidates" :key="index">
        <div class="col col-1" data-label="Identificação" style="margin-left: 10px">
          {{ candidate.id }}
        </div>
        <div class="col col-2" data-label="Nome">
          {{ `${candidate.first_name} ${candidate.last_name}` }}
        </div>
        <div class="col col-3" data-label="Email">{{ candidate.email }}</div>
        <div class="col col-4" data-label="Foto">
          <img class="avatar" :src="candidate.avatar" alt="Avatar do candidato" />
        </div>
        <div class="col col-5" data-label="Actions">
          <div class="actions">
            <button class="btn-actions" @click.prevent="">
              <img src="../assets/icons/edit.svg" class="icon" />
            </button>
            <button class="btn-actions" @click.prevent="">
              <img src="../assets/icons/delete.svg" class="icon" />
            </button>
          </div>
        </div>
      </li>
    </ul>
    <Pagination @isLoading="(value) => (isLoading = value)"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CandidatesService from '../services/CandidatesService.js'
import Pagination from '../components/PaginationTable.vue'
import Loading from '../components/LoadingSpinner.vue'
import { notify } from '../utils/functions.js'

export default {
  name: 'HomeView',
  components: { Pagination, Loading },
  data() {
    return {
      isLoading: false
    }
  },
  mounted() {
    this.candidatesService = new CandidatesService()
    this.fetchCandidates({ page: 1 })
  },
  computed: {
    ...mapGetters(['getCandidates'])
  },
  methods: {
    ...mapActions(['setCandidates', 'setPagination', 'removeToken']),
    fetchCandidates(payload) {
      this.isLoading = true
      this.candidatesService
        .FetchCandidates(payload)
        .then((payload) => {
          this.isLoading = false
          this.setCandidates(payload.data.data)
          this.setPagination(payload.data)
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    logout () {
      this.isLoading = true
      this.removeToken()
      setTimeout(() => {
        notify('Desconectado com sucesso!', ' ', 'success')
        this.isLoading = false
        this.$router.push('/')
      }, 3000);
    }
  }
}
</script>

<style lang="scss" scoped>
.headerActions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  flex-direction: row;
}

.layout {
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.icon {
  margin: 2px;
  width: 25px;
  height: 25px;
}

.logo {
  width: 120px;
  margin: 0px;
  padding: 5px;
}

.avatar {
  width: 60px;
  margin: 0px;
  border-radius: 15px;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.144);
}

.loginBackground {
  background: rgb(200, 103, 3);
  background: linear-gradient(
    144deg,
    rgba(200, 103, 3, 1) 0%,
    rgba(255, 130, 1, 1) 49%,
    rgba(255, 166, 74, 1) 100%
  );
}

.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
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
      padding: 10px 0;
      &:before {
        color: #ff8000;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 40%;
        text-align: right;
      }
    }
  }
}
</style>
