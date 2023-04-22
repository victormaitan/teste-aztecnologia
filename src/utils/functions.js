import alert from 'sweetalert';


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
  
export const notifyConfirm = function (title, text, type) {
  new alert({
    title: title,
    text: text,
    icon: type,
  });
}
