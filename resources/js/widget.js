import axios from "axios";

class Widget {
  constructor({partnerId, selector}) {
    this.id = partnerId;
    this.$selector = document.querySelector(selector);
    this.url = 'http://easyway';
  }

  async init() {
    const templateData = await this.getTemplateFromServer();
    
    if (templateData) {
      await this.renderTemplate(templateData);
      // this.renderTempate().then(function () {
      //   this.addListnerToButton();
      // 
      // })
      this.addListnerToButton();
    }
  }

  async getTemplateFromServer() {
    try {
      const {data} = await axios.get(`${this.url}/widget/${this.id}`);
      return data;
    } catch (error) {
      console.error(error);      
    }
  }

  async renderTemplate({template, style}) {
    return new Promise(resolve => {
      const btnStyle = document.createElement('link');
      btnStyle.rel = 'stylesheet'; 
      btnStyle.type = 'text/css'; 
      btnStyle.href = style; 
  
      document.head.appendChild(btnStyle);
  
      this.$selector.innerHTML = template;

      resolve();
    });
  }

  addListnerToButton() {
    const btn = document.querySelector('.btn-easy-way');

    btn.setAttribute('href', `${this.url}#calculator?referal=${this.id}` );

    btn.addEventListener('click', e => {
      e.preventDefault();
      window.open(`${this.url}/#calculator?referal=${this.id}` , '_blank');
    });
  }
}

window.easyWayWidget = Widget;