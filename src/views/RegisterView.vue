<template>
  <div class="loginBackground">
    <AppLogo />
    <Loading v-show="isLoading" style="margin-top: 40px" />
    <FormRegister v-show="!isLoading" @isLoading="(value) => (isLoading = value)" />
  </div>
</template>

<script>
import AppLogo from '../components/AppLogo.vue'
import FormRegister from '../components/FormRegister.vue'
import Loading from '../components/LoadingSpinner.vue'

export default {
  components: { Loading, AppLogo, FormRegister },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loginBackground {
  width: 100%;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(200, 103, 3);
  background: linear-gradient(
    144deg,
    rgba(200, 103, 3, 1) 0%,
    rgba(255, 130, 1, 1) 49%,
    rgba(255, 166, 74, 1) 100%
  );
}
</style>
