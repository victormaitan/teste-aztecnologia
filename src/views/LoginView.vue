<template>
  <div class="loginBackground">
    <img class="logo" src="../assets/logo.svg" alt="Logo AZ Tecnologia" />
    <form>
      <div class="dataFields">
        <label> Email </label>
        <input v-model="email" class="input" type="email" placeholder="Email" />
      </div>
      <div class="dataFields">
        <label> Senha </label>
        <div class="passwordContainer">
          <input
            v-model="password"
            class="input-password"
            :type="isVisible ? 'text' : 'password'"
          />
          <button class="btn-rounded" @click.prevent="showPassword()">
            <img v-if="isVisible" src="../assets/icons/eye.svg" class="icon" />
            <img v-else src="../assets/icons/eye-slash.svg" class="icon" />
          </button>
        </div>
      </div>
      <div class="actions">
        <button class="btn" @click.prevent="signIn(email, password)">Entrar</button>
        <button class="btn" @click.prevent="notify()">Esqueci minha senha</button>
      </div>
    </form>
  </div>
</template>

<script>
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
    this.notify()
  },
  methods: {
    showPassword() {
      this.isVisible = !this.isVisible
    },
    notify() {
      const options = {
        opt: {
          body: 'Criando nova notificação',
          icon: ''
        },
        title: 'Olá mundo!',
        link: 'https://www.google.com.br/'
      }

      if (!window.Notification) {
        console.log('Este browser não suporta Web Notifications!')
        return
      }

      if (Notification.permission === 'default') {
        Notification.requestPermission()
      } else if (Notification.permission === 'granted') {

        let notification = new Notification('Titulo', options.opt)
        notification.onshow = () => {
          console.log('onshow: evento quando a notificação é exibida')
        }
        notification.onclick = () => {
          console.log('onclick: evento quando a notificação é clicada')
        }
        notification.onclose = () => {
          console.log('onclose: evento quando a notificação é fechada')
        }
        notification.onerror = () => {
          console.log(
            'onerror: evento quando a notificação não pode ser exibida. É disparado quando a permissão é defualt ou denied'
          )
        }
      } else if (Notification.permission === 'denied') {
        console.log('Usuário não deu permissão')
      }
    },
    signIn(email, password) {
      this.loginService.SignIn({ email, password })
    }
  }
}
</script>

<style lang="scss" scoped>
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

.logo {
  width: 220px;
}
</style>
