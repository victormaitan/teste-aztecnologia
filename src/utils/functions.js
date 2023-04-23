import alert from 'sweetalert';
import store from '../store'
import CandidatesService from '../services/CandidatesService.js'
    
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
  buttons: ['Cancelar', 'Excluir'],
  dangerMode: true,
  }).then((willDelete) => {
  if (willDelete) {
    alert("*Schrash*! O candidato foi excluido com sucesso!", {
      icon: "success",buttons: false,
    timer: 3000
    });
    candidatesService.DeleteCandidate(id)
  } else {
    alert("O candidato está seguro! Nada aconteceu", {icon: "info"});
  }
  });
}
