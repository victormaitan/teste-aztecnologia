import alert from 'sweetalert';
import store from '../store'
import CandidatesService from '../services/CandidatesService.js'


export const notifyDesktop = function (title, description) {
  const options = {
    opt: {
      body: description,
      icon: 'src/assets/logo.png'
    }
  }
  
  if (!window.Notification) {
    console.log('Este browser não suporta Web Notifications!')
    return
  }
  
  if (Notification.permission === 'default') {
    Notification.requestPermission()
  } else if (Notification.permission === 'granted') {
    let notification = new Notification(title, options.opt)
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
    }
    
export const notify = function (title, text, type) {
  new alert({
    title: title,
    text: text,
    icon: type,
    buttons: false,
    timer: 3000
  })
}
    
    
export const notifyConfirm = function () {
  const candidatesService = new CandidatesService()
  const id = store.getters.getDeleteId
  new alert({
  title: "Tem certeza?",
  text: "Uma vez excluído, este candidato não poderá ser encontrado!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
  }).then((willDelete) => {
  if (willDelete) {
    alert("*Schrash*! O candidato foi excluido com sucesso!", {
      icon: "success",
    });
    candidatesService.DeleteCandidate(id)
  } else {
    alert("O candidato está seguro! Nada aconteceu");
  }
  });
}
