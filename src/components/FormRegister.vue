<template>
  <form>
    <h2>Cadastre-se</h2>
    <div class="dataFields">
      <label> Email </label>
      <input v-model="email" class="input" type="email" placeholder="Email" />
    </div>
    <div class="dataFields">
      <label> Senha </label>
      <div class="passwordContainer">
        <input v-model="password" class="input-password" :type="isVisible ? 'text' : 'password'" />
        <button class="btn-rounded" @click.prevent="showPassword()">
          <img v-if="isVisible" src="../assets/icons/eye.svg" class="icon" />
          <img v-else src="../assets/icons/eye-slash.svg" class="icon" />
        </button>
      </div>
    </div>
    <div class="actions">
      <button class="btn" @click.prevent="signUp(email, password)">Cadastrar</button>
      <button class="btn-flat" @click.prevent="$router.push('/')">Cancelar</button>
    </div>
  </form>
</template>

<script>
import { notify } from '../utils/functions.js'
import LoginService from '../services/LoginService.js'

export default {
  data() {
    return {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
      isVisible: false,
      passwordIcon: '../assets/icons/eye.svg'
    }
  },
  mounted() {
    this.loginService = new LoginService()
  },
  methods: {
    showPassword() {
      this.isVisible = !this.isVisible
    },
    signUp(email, password) {
      this.$emit('isLoading', true)
      this.loginService
        .SignUp({ email, password })
        .then(() => {
          this.$emit('isLoading', false)
          notify('Conta criada', 'Conta criada com sucesso!', 'success')
          this.$router.push('/')
        })
        .catch(() => {
          this.$emit('isLoading', false)
          notify('Erro ao cadastrar', 'Tente novamente, mais tarde!', 'error')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dataFields {
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.actions {
  display: grid;
  margin-top: 20px;
}

input {
  border-radius: 5px;
  height: 40px;
}

form {
  margin-top: 50px;
}

label {
  color: white;
}

.icon {
  margin: 2px;
  width: 25px;
  height: 25px;
}
</style>
