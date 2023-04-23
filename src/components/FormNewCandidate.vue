<template>
  <form action="">
    <h2>Novo Candidato</h2>
    <div class="dataFields">
      <label> Nome </label>
      <input v-model="name" class="input" type="text" placeholder="John Doe" />
    </div>
    <div class="dataFields">
      <label> Trabalho </label>
      <input v-model="job" class="input" type="text" placeholder="Tech Lead" />
    </div>
    <div class="actions">
      <button class="btn" @click.prevent="newCandidate(name, job), false">Cadastrar</button>
      <button class="btn-flat" @click.prevent="$router.push('/')">Cancelar</button>
    </div>
  </form>
</template>

<script>
import { notify } from '../utils/functions.js'
import CandidateService from '../services/CandidatesService.js'

export default {
  data() {
    return {
      name: '',
      job: ''
    }
  },
  mounted() {
    this.candidateService = new CandidateService()
  },
  methods: {
    newCandidate(name, job) {
      if (this.name === '' || this.job === '') {
        notify('Ops!', 'Preencha todos os campos obrigatórios antes de finalizar!', 'warning')
      } else {
        this.$emit('isLoading', true)
        this.candidateService
          .RegisterCandidate({ name, job })
          .then(() => {
            this.$emit('isLoading', false)
            notify('Candidato Cadastrado', 'Candidato cadastrado com sucesso!', 'success')
            this.$router.push('/')
          })
          .catch(() => {
            this.$emit('isLoading', false)
            notify('Erro ao cadastrar', 'Tente novamente, mais tarde!', 'error')
          })
      }
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
  margin-top: 20px;
}

label {
  color: white;
}

h2 {
  margin-bottom: 10px;
}

.icon {
  margin: 2px;
  width: 25px;
  height: 25px;
}
</style>
