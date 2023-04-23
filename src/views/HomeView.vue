<template>
  <div class="layout loginBackground">
    <img class="logo" src="../assets/logoFull.png" alt="Logo AZ Tecnologia" />
    <button class="btn-exit" @click.prevent="logout()">
      <img src="../assets/icons/exit.svg" class="icon" />
    </button>
  </div>
  <Loading class="layout" v-show="isLoading" style="margin-top: 40vh"/>
  <div v-show="!isLoading" class="container">
    <div class="headerActions">
      <h2>Candidatos</h2>
      <button class="btn" @click.prevent="$router.push({ name: 'new-candidate' })">Novo Candidato</button>
    </div>
    <CandidatesTable @isLoading="(value) => (isLoading = value)"/>
    <Pagination @isLoading="(value) => (isLoading = value)"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from '../components/PaginationTable.vue'
import Loading from '../components/LoadingSpinner.vue'
import CandidatesTable from '../components/CandidatesTable.vue'
import { notify } from '../utils/functions.js'

export default {
  name: 'HomeView',
  components: { Pagination, Loading, CandidatesTable },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['removeToken']),
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

.layout {
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.headerActions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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



h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
}

</style>
