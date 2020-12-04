import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.title = document.createElement('h3');
    this.modalBody = document.createElement('div');
    this.modal = document.createElement('div');
  }

  open() {
    let modalOverlay = document.createElement('div');
    let modalInner = document.createElement('div');
    let modalHeader = document.createElement('div');
    let closeButton = document.createElement('button');
    let buttonImg = document.createElement('img');

    this.modal.classList.add('modal');
    modalOverlay.classList.add('modal__overlay');
    modalInner.classList.add('modal__inner');
    modalHeader.classList.add('modal__header');
    closeButton.classList.add('modal__close');
    closeButton.type = 'button';
    buttonImg.src = '/assets/images/icons/cross-icon.svg';
    buttonImg.alt = 'close-icon';
    this.title.classList.add('modal__title');
    this.modalBody.classList.add('modal__body');

    document.body.append(this.modal);
    this.modal.append(modalOverlay, modalInner);
    modalInner.append(modalHeader, this.modalBody);
    modalHeader.append(closeButton, this.title);
    closeButton.append(buttonImg);

    document.body.classList.add('is-modal-open');
    
    this.closeHandler();
  }

  setTitle(title) {
    this.title.innerHTML = title;
  }

  setBody(modalBody) {
    this.modalBody.innerHTML = '';
    this.modalBody.append(modalBody);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.modal.remove();
  }

  closeHandler() {
    document.addEventListener('click', event => {
      
      if (event.target.closest('.modal__close')) {
        this.close();
      }
    }, {once: true});

    document.addEventListener('keydown', event => {

      if (document.body.classList.contains('is-modal-open')) {
        
        if (event.code === 'Escape') {
          this.close();
        }
      }
    });
  }
}
