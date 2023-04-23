<template>
  <div class="layout loginBackground">
    <img class="logo" src="../assets/logoFull.png" alt="Logo AZ Tecnologia" />
    <button class="btn-exit" @click.prevent="logout()">
      <img src="../assets/icons/exit.svg" class="icon" />
    </button>
  </div>
  <Loading class="layout" v-show="isLoading" style="margin-top: 40vh" />
  <div v-show="!isLoading" class="container">
    <FormEditCandidate v-show="!isLoading" @isLoading="(value) => (isLoading = value)" />
  </div>
</template>

<script>
import FormEditCandidate from '../components/FormEditCandidate.vue'
import Loading from '../components/LoadingSpinner.vue'

export default {
  components: { Loading, FormEditCandidate },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loginBackground {
  background: rgb(200, 103, 3);
  background: linear-gradient(
    144deg,
    rgba(200, 103, 3, 1) 0%,
    rgba(255, 130, 1, 1) 49%,
    rgba(255, 166, 74, 1) 100%
  );
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

</style>
