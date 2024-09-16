<template>
  <div class="row">
    <p class="row-text">Sistema Médico de Gestão Hospitalar</p>
  </div>
  <div class="options-row">
    <span>
      <button
        :class="{ selected: selectedButton.first === 'agenda' }"
        @click="selectButton('agenda', 'first')"
      >
        <p>Agenda</p>
      </button>
      <button
        :class="{ selected: selectedButton.first === 'ambulatorio' }"
        @click="selectButton('ambulatorio', 'first')"
      >
        <p>Ambulatório</p>
      </button>
      <button
        :class="{ selected: selectedButton.first === 'atendidos' }"
        @click="selectButton('atendidos', 'first')"
      >
        <p>Atendidos</p>
      </button>
      <button
        :class="{ selected: selectedButton.first === 'laudos' }"
        @click="selectButton('laudos', 'first')"
      >
        <p>Laudos</p>
      </button>
    </span>
    <span class="logo">
      <img src="../assets/hospital_logo.png" alt="" />
    </span>
  </div>

  <div class="row">
    <p class="row-text">Atendimento - Registro de Atendimento</p>
  </div>

  <div class="container">
    <main>
      <div class="option-btns-first">
        <button>Fechar</button>
        <button>Salvar</button>
        <button>Imprimir</button>
      </div>
      <div class="fields-row">
        <span class="field" style="width: fit-content">
          <label for="dataAtendimento" class="form-label"
            >Data do Atendimento</label
          >
          <input
            style="width: 164px"
            type="date"
            class="form-control"
            id="dataAtendimento"
          />
        </span>
        <span class="field" style="width: fit-content">
          <label for="horarioAtendimento" class="form-label">Horário</label>
          <input
            style="width: 85px"
            type="time"
            class="form-control"
            id="horarioAtendimento"
          />
        </span>
        <span class="field" style="width: 100%">
          <label for="nomePaciente" class="form-label">Nome do Paciente</label>
          <input type="text" class="form-control" id="nomePaciente" />
        </span>
      </div>
      <div class="option-btns-second">
        <button style="background-color: #a8cbcd; color: #000">
          Atendimento
        </button>
        <button>Autorização</button>
        <button>Observações</button>
        <button>Arquivo</button>
      </div>
      <div class="form">
        <div class="fields-row">
          <span class="field" style="width: fit-content">
            <label for="planoDeSaude" class="form-label"
              >Plano de Saúde do Paciente</label
            >
            <input
              style="width: 370px"
              type="text"
              class="form-control"
              id="planoDeSaude"
            />
          </span>
          <span class="field" style="width: fit-content">
            <label for="validadeCarteira" class="form-label"
              >Validade da Carteira</label
            >
            <input
              style="width: 184px"
              type="date"
              class="form-control"
              id="validadeCarteira"
            />
          </span>
          <span class="field" style="width: 100%">
            <label for="numeroCarteira" class="form-label"
              >Numero da carteira</label
            >
            <input type="text" class="form-control" id="numeroCarteira" />
          </span>
        </div>
        <div class="fields-row">
          <span class="field" style="width: fit-content">
            <label for="medico" class="form-label"
              >Médico/Profissional Executante</label
            >
            <input
              style="width: 370px"
              type="text"
              class="form-control"
              id="medico"
            />
          </span>
          <span class="field" style="width: fit-content">
            <label for="conselho" class="form-label">Conselho</label>
            <input
              style="width: 102px"
              type="text"
              class="form-control"
              id="conselho"
            />
          </span>
          <span class="field" style="width: 100%">
            <label for="numeroConselho" class="form-label"
              >Número do Conselho</label
            >
            <input type="text" class="form-control" id="numeroConselho" />
          </span>
        </div>
        <div class="fields-row">
          <span class="field" style="width: fit-content">
            <label for="caraterSolicitacao" class="form-label"
              >Caráter da Solicitação</label
            >
            <input
              style="width: 370px"
              type="text"
              class="form-control"
              id="caraterSolicitacao"
            />
          </span>
          <span class="field" style="width: fit-content">
            <label for="dataEmissao" class="form-label">Data de Emissão</label>
            <input
              style="width: 184px"
              type="date"
              class="form-control"
              id="dataEmissao"
            />
          </span>
          <span class="field" style="width: 100%">
            <label for="unidadeAtendimento" class="form-label"
              >Unidade de Atendimento</label
            >
            <input type="text" class="form-control" id="unidadeAtendimento" />
          </span>
        </div>
        <div>
          <span class="field" style="width: 100%t">
            <label for="observacaoJustificativa" class="form-label"
              >Observação/Justificativa</label
            >
            <input
              style="height: 123px"
              type="text"
              class="form-control"
              id="observacaoJustificativa"
            />
            {{ !isConnected ? "offline" : "online" }}
            <button class="assinar-btn" @click="sendImage">
              <p>Assinar Digitalmente</p>
            </button>
          </span>
        </div>
      </div>
    </main>
    <aside>
      <div class="picture-box"></div>
      <div class="aside-data">
        <span class="field-side">
          <label for="nascimento" class="form-label">Nascimento</label>
          <input type="date" class="form-control" id="nascimento" disabled />
        </span>
        <span class="field-side">
          <label for="idade" class="form-label">Idade</label>
          <input
            type="text"
            class="form-control idade"
            id="idade"
            disabled
            value="00"
          />
        </span>
        <span class="field-side">
          <label for="ultimaConsulta" class="form-label"
            >Ultima Consulta:</label
          >
          <input
            type="date"
            class="form-control"
            id="ultimaConsulta"
            disabled
          />
        </span>
      </div>
    </aside>
  </div>

  <div class="modal" v-if="showModal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-header">
        <p style="color: #fff">Assinatura Digital</p>
      </div>
      <p class="modal-text">{{ modalMessage }}</p>
      <div class="btn-wrapper">
        <button
          class="button-modal"
          v-if="modalMessage === 'Assinatura Cancelada'"
          @click="showModal = false"
        >
          Ok
        </button>
      </div>

      <div v-if="modalMessage === 'Assinatura Concluída'" class="btn-wrapper">
        <button class="button-modal" @click="openPdfViewer">Visualizar</button>
        <button class="button-modal" @click="sendData()">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { io } from "socket.io-client";

export default {
  data() {
    return {
      selectedButton: {
        first: "agenda",
        second: "atendimento",
      },
      socket: null,
      isConnected: false,
      ipdanilo: "192.168.1.22",
      showModal: false,
      modalMessage: "",
      signedFile: null,
      showPdfViewer: false,
    };
  },
  mounted() {
    this.connectToSocket();
  },
  methods: {
    selectButton(button, where) {
      this.selectedButton[where] = button;
    },
    connectToSocket() {
      this.socket = io(`http://${this.ipdanilo}:3000`); // Replace with your server URL

      this.socket.on("connect", () => {
        this.isConnected = true;
        console.log("Connected to server");
      });

      this.socket.on("message", (message) => {
        this.messages.push(message);
      });

      this.socket.on("imageFromReactNative", (data) => {
        this.signedFile = data.signedPdf;
        if (data.signedPdf) return (this.modalMessage = "Assinatura Concluída");
        this.modalMessage = "Assinatura Cancelada";
      });

      this.socket.on("disconnect", () => {
        this.isConnected = false;
        console.log("Disconnected from server");
      });
      // setTimeout(() => {
      //   this.socket.disconnect();
      // }, 5000);
    },
    async sendImage() {
      if (!this.isConnected) {
        this.showModal = true;
        this.modalMessage = "Conectando ao servidor...";
        this.connectToSocket();
      }

      if (this.isConnected) {
        this.showModal = true;
        this.modalMessage = "Aguardando assinatura de documento...";
        this.socket.emit("sendData");

        this.socket.on("reply", (reply) => {
          this.modalMessage = "Recebido com sucesso!";
          // Handle reply data as needed
        });
      }
    },
    closeModal() {
      this.showModal = false;
      // Reset modal message or any other cleanup if needed
    },
    sendData() {
      this.showModal = false;
      console.log("enivar para o servidor");

      // const response = await axios.post(
      //   `http://${this.ipdanilo}:3000/document`,
      //   {file: this.signedFile}
      // );

      // console.log(response);
    },
    openPdfViewer() {
      this.showPdfViewer = true;
    },
    closePdfViewer() {
      this.showPdfViewer = false;
    },
  },
};
</script>

<style scoped>
.pdf {
  border: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.row {
  height: 34px;
  width: 100%;
  background-color: #498185;
  display: flex;
  align-items: center;
}

.row-text {
  color: #fff;
  margin-left: 20px;
}

.options-row button {
  margin-top: 22px;
  margin: 28px;
  width: 132px;
  height: 100px;
  background-color: #ebebeb;
  border: none;
  border-radius: 17px;
  cursor: pointer;
}

.options-row button.selected {
  /* Styles for the selected button */
  box-shadow: 0px 1px 4.6px 2px rgba(0, 0, 0, 0.2);
}

.options-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo {
  margin-right: 39px;
}

.option button p {
  font-size: 18px;
  font-style: 500;
}

.option-btns-first {
  display: flex;
  gap: 20px;
  margin: 25px 0;
}

.option-btns-second {
  display: flex;
  gap: 20px;
  margin: 28px 0;
}

.option-btns-first button {
  width: 142px;
  height: 39px;
  background-color: #a8cbcd;
  color: #000000;
  border-radius: 13px;
  border: none;
}

.option-btns-second button {
  width: 164px;
  height: 39px;
  background-color: #498185;
  color: #fff;
  border-radius: 13px;
  border: none;
}

button {
  cursor: pointer;
}

.field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.fields-row {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
}

input {
  background-color: #e9e9e9;
  border: none;
  height: 28px;
}

aside {
  width: 324px;
  margin-top: 89px;
  margin-right: 21px;
}

.field-side {
  position: relative;
  display: flex;
  align-items: center;
}

.field-side input {
  width: 100%;
}

.field-side .form-control {
  padding-left: 223px; /* Adjust based on label width */
  flex: 1;
}

.field-side .form-control.idade {
  padding-left: 286px; /* Adjust based on label width */
  flex: 1;
}

.field-side .form-label {
  position: absolute;
  left: 10px;
  pointer-events: none;
  color: #999;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.aside-data {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.picture-box {
  height: 302px;
  width: 100%;
  border: 1px solid black;
  margin-bottom: 29px;
}

main {
  width: 100%;
  margin: 0 21px;
}

.assinar-btn {
  width: 256px;
  height: 39px;
  background-color: #498185;
  border: none;
  color: #fff;
  border-radius: 13px;
  margin: 23px 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Darker background */
}

.modal-content {
  z-index: 999;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  width: 620px;
  height: 192px;
}

.modal-header {
  border-radius: 10px 10px 0 0;
  width: 620px;
  height: 34px;
  background-color: #498185;
  position: absolute;
  align-items: center;
  display: flex;
  padding-left: 10px;
}

.modal-text {
  display: flex;
  align-self: center;
  justify-content: center;
  margin-top: 75px;
}

.btn-wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.button-modal {
  width: 102px;
  height: 31px;
  background-color: #e9e9e9;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
